import { UserRoleType } from 'src/users/constants/user-role-type';

const regionsData = [
  {
    regionName: 'Punjab',
    cities: [
      {
        name: 'Lahore',
        districts: [
          { name: 'Johar Town' },
          { name: 'Gulberg' },
          { name: 'Model Town' },
          { name: 'DHA' },
          { name: 'Shadman' },
          { name: 'Wapda Town' },
          { name: 'Cantt' },
          { name: 'Barki' },
          { name: 'Ravi Town' },
          { name: 'Samnabad' },
        ],
      },
      {
        name: 'Faisalabad',
        districts: [
          { name: 'Jaranwala' },
          { name: 'Samundri' },
          { name: 'Chak Jhumra' },
          { name: 'Tandlianwala' },
          { name: 'Lyallpur Town' },
          { name: 'Madina Town' },
          { name: 'Jinnah Town' },
          { name: 'Iqbal Town' },
          { name: 'Sadar Town' },
          { name: 'Peoples Colony' },
        ],
      },
      {
        name: 'Rawalpindi',
        districts: [
          { name: 'Morgah' },
          { name: 'Chaklala' },
          { name: 'Satellite Town' },
          { name: 'Dhamial' },
          { name: 'Bahria Town' },
          { name: 'Peshawar Road' },
          { name: 'Westridge' },
          { name: 'Adiala' },
          { name: 'Golra' },
        ],
      },
      {
        name: 'Multan',
        districts: [
          { name: 'Gulgasht Colony' },
          { name: 'Shah Rukn-e-Alam' },
          { name: 'Old City' },
          { name: 'Mumtazabad' },
          { name: 'New Multan' },
          { name: 'Shujabad' },
          { name: 'Lodhran' },
          { name: 'Vehari' },
        ],
      },
      {
        name: 'Sialkot',
        districts: [
          { name: 'Ugoki' },
          { name: 'Sambrial' },
          { name: 'Pasrur' },
          { name: 'Daska' },
          { name: 'Shahabpura' },
          { name: 'Kotli Loharan' },
          { name: 'Hajipura' },
        ],
      },
      {
        name: 'Gujranwala',
        districts: [
          { name: 'Wazirabad' },
          { name: 'Kamoke' },
          { name: 'Ghakhar Mandi' },
          { name: 'Eminabad' },
          { name: 'Nowshera Virkan' },
          { name: 'Aroop Town' },
        ],
      },
      {
        name: 'Bahawalpur',
        districts: [
          { name: 'Uch Sharif' },
          { name: 'Yazman' },
          { name: 'Ahmedpur East' },
          { name: 'Chishtian' },
          { name: 'Hasilpur' },
          { name: 'Khairpur Tamewali' },
          { name: 'Bahawalnagar' },
        ],
      },
      {
        name: 'Sheikhupura',
        districts: [
          { name: 'Farooqabad' },
          { name: 'Muridke' },
          { name: 'Sharaqpur' },
          { name: 'Ferozewala' },
          { name: 'Rachna Town' },
          { name: 'Kala Shah Kaku' },
          { name: 'Warburton' },
        ],
      },
      {
        name: 'Sargodha',
        districts: [
          { name: 'University Road' },
          { name: 'Kot Momin' },
          { name: 'Bhalwal' },
          { name: 'Shahpur' },
          { name: 'Silanwali' },
          { name: 'Shahpur Sadar' },
          { name: 'Lalian' },
        ],
      },
      {
        name: 'Kasur',
        districts: [
          { name: 'Pattoki' },
          { name: 'Chunian' },
          { name: 'Kot Radha Kishan' },
          { name: 'Allahabad' },
          { name: 'Phoolnagar' },
          { name: 'Raiwind' },
          { name: 'Kanganpur' },
          { name: 'Bhedian Kalan' },
          { name: 'Mustafabad' },
        ],
      },
    ],
  },
  {
    regionName: 'Sindh',
    cities: [
      {
        name: 'Karachi',
        districts: [
          { name: 'Malir' },
          { name: 'Korangi' },
          { name: 'Gulshan-e-Iqbal' },
          { name: 'Saddar' },
          { name: 'Nazimabad' },
          { name: 'Orangi Town' },
          { name: 'Liaquatabad' },
          { name: 'North Karachi' },
          { name: 'Shah Faisal' },
        ],
      },
      {
        name: 'Hyderabad',
        districts: [
          { name: 'Qasimabad' },
          { name: 'Latifabad' },
          { name: 'Tando Jam' },
          { name: 'Hala' },
          { name: 'Tando Allahyar' },
          { name: 'Tando Muhammad Khan' },
          { name: 'Matiari' },
          { name: 'Husri' },
          { name: 'Kotri' },
        ],
      },
      {
        name: 'Sukkur',
        districts: [
          { name: 'Rohri' },
          { name: 'Pano Aqil' },
          { name: 'New Sukkur' },
          { name: 'Old Sukkur' },
          { name: 'City Bypass' },
          { name: 'Shikarpur' },
          { name: 'Jacobabad' },
          { name: 'Khairpur' },
          { name: 'Barrage Colony' },
        ],
      },
      {
        name: 'Larkana',
        districts: [
          { name: 'Rato Dero' },
          { name: 'Dokri' },
          { name: 'Bakrani' },
          { name: 'Kambar' },
          { name: 'Shahdadkot' },
          { name: 'Naundero' },
          { name: 'Miro Khan' },
          { name: 'Qambar Ali Khan' },
        ],
      },
    ],
  },
];
const technicianLanguages = ['English', 'Urdu', 'Arabic'];

const technicianSpecialties = [
  'Antivirus and Malware Removal',
  'Asset Management',
  'Attention to Detail',
  'Basic Application Support',
  'Basic Command Line Proficiency',
  'Basic Networking',
  'Basic Security Protocols',
  'Communication',
  'Data Backup',
  'Diagnostic Tools',
  'Documentation of Procedures',
  'Driver Installation',
  'Electrical Safety Awareness',
  'Handling New Hardware',
  'Hardware Installation and Repair',
  'Imaging Software',
  'Issue Reporting',
  'LAN/WAN Setup',
  'Learning New Tools and Software',
  'Mass Deployment',
  'Network Cable Management',
  'Operating System Installation and Configuration',
  'Password Management',
  'Patch Management',
  'Patience and Empathy',
  'Peripheral Device Configuration',
  'Physical Requirements',
  'Problem-Solving',
  'Remote Troubleshooting Tools',
  'Root Cause Analysis',
  'Teamwork',
  'Ticketing Systems',
  'Time Management',
  'User Training',
  'Wireless Network Troubleshooting',
  'Work Under Pressure',
  'Workstation Setup',
];

const technicianCertificates = [
  'CompTIA A',
  'CompTIA IT Fundamentals (ITF+)',
  'HDI Desktop Support Technician Certification',
  'Microsoft Certified: Modern Desktop Administrator Associate',
];

const segmentsList = [
  {
    segmentName: 'Micro Business',
    segmentCode: 'micro_bussiness',
    segmentDescription: 'Number of employees on 1 to 5 full-time',
  },
  {
    segmentName: 'Small Business',
    segmentCode: 'small_bussiness',
    segmentDescription: 'Number of employees on 6 to 49 full-time',
  },
  {
    segmentName: 'Medium Business',
    segmentCode: 'midsize_bussiness',
    segmentDescription: 'Number of employees on 50 to 249 full-time',
  },
  {
    segmentName: 'Large Business',
    segmentCode: 'enterprise_bussiness',
    segmentDescription: 'Number of employees 250 or more full-time',
  },
];

const durationsList = [
  {
    durationType: 'Monthly',
    durationCode: 'monthly',
  },
  {
    durationType: 'Quarterly',
    durationCode: 'quarterly',
  },
  {
    durationType: 'Semi Annually',
    durationCode: 'semi_annually',
  },
  {
    durationType: 'Annual',
    durationCode: 'annual',
  },
];

const rolesData = [
  {
    roleName: 'Super Admin',
    roleCode: 'super_admin',
  },
  {
    roleName: 'Admin',
    roleCode: 'admin',
  },
  {
    roleName: 'Customer',
    roleCode: 'customer',
  },
  {
    roleName: 'Technician',
    roleCode: 'technician',
  },
];

const superAdminData = {
  firstName: 'Super',
  lastName: 'Admin',
  email: 'chhassnain16@gmail.com',
  password: 'Hello@123',
  role: UserRoleType.SUPER_ADMIN,
};

export {
  rolesData,
  regionsData,
  segmentsList,
  durationsList,
  superAdminData,
  technicianLanguages,
  technicianCertificates,
  technicianSpecialties,
};
