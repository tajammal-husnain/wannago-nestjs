import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Region } from 'src/seed/entities/regions.entity';
import { City } from 'src/seed/entities/city.entity';
import { District } from 'src/seed/entities/districts.entity';
import {
  TechnicianDTO,
  BaseUserDTO,
  CustomerDTO,
} from '../dtos/create-user.dto';
import { PrivateFileService } from './private-file.service';
import { PostgresErrorCode } from 'src/database/postgresErrorCodes.enum';
import {
  Customer,
  SuperAdmin,
  Technician,
  User,
} from '../entities/user.entity';
import { hashPassword } from 'src/common/helper';
import { UserRoleType } from '../constants/user-role-type';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(SuperAdmin)
    private superAdminRepository: Repository<SuperAdmin>,

    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,

    @InjectRepository(Technician)
    private technicianRepository: Repository<Technician>,

    @InjectRepository(Region)
    private regionRepository: Repository<Region>,

    @InjectRepository(City)
    private cityRepository: Repository<City>,

    @InjectRepository(District)
    private districtRepository: Repository<District>,

    private privateFileService: PrivateFileService,
  ) {}

  async createSuperAdmin(superAdmin: BaseUserDTO) {
    try {
      const existingSuperAdmin = await this.superAdminRepository.findOne({
        where: { email: superAdmin?.email },
      });
      if (existingSuperAdmin) return existingSuperAdmin;

      superAdmin.password = await hashPassword(superAdmin.password);
      const createdSuperAdmin = this.userRepository.create(superAdmin);

      return await this.userRepository.save(createdSuperAdmin);
    } catch (error) {
      console.log(`🚀 -- error is called:`, error?.message);
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        this.logger.log(`Error seeding super admin data ${error}`);
        throw new HttpException(
          'User with that email already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getByEmail(email: string) {
    try {
      const user = await this.userRepository.findOne({ where: { email } });
      if (!user)
        throw new NotFoundException(`User not found with email ${email}`);

      return user;
    } catch (error) {
      this.logger.error(`Error while fetching user with email ${error}`);
    }
  }

  async getById(userId: string) {
    try {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (!user)
        throw new NotFoundException(`User not found with id ${userId}`);

      return user;
    } catch (error) {
      this.logger.error(`Error while fetching user with userId ${error}`);
    }
  }

  async createTechnician(createTechnicianInput: TechnicianDTO) {
    try {
      const existingCustomer = await this.technicianRepository.findOne({
        where: {
          email: createTechnicianInput.email,
          role: UserRoleType.CUSTOMER,
        },
      });
      if (existingCustomer) {
        throw new HttpException(
          'Technician with this email already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      const { region, city, district, ...technicianData } =
        createTechnicianInput;

      const regionObj = await this.regionRepository.findOne({
        where: { id: region },
      });
      if (!regionObj) {
        throw new NotFoundException(`Region with ${region} not found`);
      }
      const cityObj = await this.cityRepository.findOne({
        where: { id: city },
      });
      if (!cityObj) {
        throw new NotFoundException(`City with ${city} id not found`);
      }
      const districtObj = await this.districtRepository.findOne({
        where: { id: district },
      });
      if (!districtObj) {
        throw new NotFoundException(`District with ${district} id not found`);
      }
      // const additionalDocumentsStr =
      //   Array(createTechnicianInput?.additionalDocuments).join(',') || '';

      const newTechnician = this.technicianRepository.create({
        ...technicianData,
        role: UserRoleType.TECHNICIAN,
        availability: 'All times',
        additionalDocuments: [],
      });
      await this.userRepository.save(newTechnician);

      const [
        profileFilePath,
        resumeFilePath,
        idFrontFilePath,
        backFrontFilePath,
      ] = await Promise.all([
        this.privateFileService.uploadTechnicianFile(
          `${newTechnician?.id}-profile`,
          createTechnicianInput?.profilePicture,
        ),
        this.privateFileService.uploadTechnicianFile(
          `${newTechnician?.id}-resume`,
          createTechnicianInput?.resumeFile,
        ),
        this.privateFileService.uploadTechnicianFile(
          `${newTechnician?.id}-id-front`,
          createTechnicianInput?.identityFileFront,
        ),
        this.privateFileService.uploadTechnicianFile(
          `${newTechnician?.id}-id-back`,
          createTechnicianInput?.identityFileBack,
        ),
      ]);
      const additionalFilesPath =
        createTechnicianInput?.additionalDocuments?.length > 0
          ? await Promise.all(
              createTechnicianInput?.additionalDocuments?.map(
                async (file: Buffer, index: number) => {
                  return this.privateFileService.uploadTechnicianFile(
                    `${newTechnician?.id}-additional-file-${index}`,
                    file,
                  );
                },
              ),
            )
          : [];
      const savedTechnician = await this.technicianRepository.findOne({
        where: { id: newTechnician?.id },
      });
      await this.technicianRepository.update(newTechnician.id, {
        ...savedTechnician,
        profilePicture: profileFilePath,
        identityFileFront: idFrontFilePath,
        identityFileBack: backFrontFilePath,
        resumeFile: resumeFilePath,
        additionalDocuments: additionalFilesPath,
      });

      return {
        message: 'Technician added successfully',
        data: savedTechnician,
      };
    } catch (error) {
      this.logger.error(`Error while creating technician, ${error?.message}`);
      throw new HttpException(
        `Error while creating technician ${error?.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllTechnicians() {
    const techniciansList = await this.technicianRepository.find();
    if (!techniciansList?.length)
      throw new NotFoundException('No technician found');

    const allTechnicians = await Promise.all(
      techniciansList.map(async (technician) => {
        const [
          profilePictureFile,
          resumeFile,
          identityFileFront,
          identityFileBack,
        ] = await Promise.all([
          this.privateFileService.getPrivateSignedUrlFromUrl(
            technician?.profilePicture,
          ),
          this.privateFileService.getPrivateSignedUrlFromUrl(
            technician?.resumeFile,
          ),
          this.privateFileService.getPrivateSignedUrlFromUrl(
            technician?.identityFileFront,
          ),
          this.privateFileService.getPrivateSignedUrlFromUrl(
            technician?.identityFileBack,
          ),
        ]);

        const additionalDocuments =
          technician?.additionalDocuments?.length > 0
            ? await Promise.all(
                technician?.additionalDocuments.map(
                  async (filePath: string) => {
                    return this.privateFileService.getPrivateSignedUrlFromUrl(
                      filePath,
                    );
                  },
                ),
              )
            : [];
        return {
          ...technician,
          profilePictureFile,
          resumeFile,
          identityFileFront,
          identityFileBack,
          additionalDocuments,
        };
      }),
    );

    return allTechnicians;
  }

  async createCustomer(customerInput: CustomerDTO) {
    try {
      const existingCustomer = await this.userRepository.findOne({
        where: { email: customerInput.email },
      });
      if (existingCustomer)
        throw new HttpException(
          'Customer with this email already exists',
          HttpStatus.BAD_REQUEST,
        );
      customerInput.password = await hashPassword(customerInput.password);
      customerInput.role = UserRoleType.CUSTOMER;
      const customer: User = this.customerRepository.create(customerInput);
      await this.userRepository.save(customer);
      return customer;
    } catch (error) {
      this.logger.error(`Error while creating customer ${error?.message}`);
    }
  }
}
