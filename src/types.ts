export type ServiceStatus = 'Pending' | 'Completed';

export interface Booking {
  id: string;
  name: string;
  phone: string;
  service: string;
  message: string;
  fileUrl?: string;
  fileName?: string;
  status: ServiceStatus;
  paymentStatus: 'Unpaid' | 'Paid';
  createdAt: number;
}

export interface Message {
  id: string;
  bookingId: string;
  sender: 'User' | 'Admin';
  text: string;
  fileUrl?: string;
  fileName?: string;
  createdAt: number;
}

export interface Update {
  id: string;
  date: string;
  title: string;
  description: string;
  category?: string;
}

export const SERVICES = [
  {
    id: 'itr',
    title: 'ITR Filing',
    description: 'Expert Income Tax Return filing for individuals, businesses, and professionals.',
    fullDescription: 'Income Tax Return (ITR) is a form used to declare your income and the tax paid on it to the Income Tax Department. Filing ITR is mandatory for individuals whose income exceeds the basic exemption limit.',
    benefits: [
      'Avoid penalties and legal issues',
      'Easy loan approvals',
      'Claim tax refunds',
      'Carry forward losses'
    ]
  },
  {
    id: 'gst-reg',
    title: 'GST Registration',
    description: 'Hassle-free GST registration for your business with expert guidance.',
    fullDescription: 'Goods and Services Tax (GST) registration is mandatory for businesses whose turnover exceeds the threshold limit or for those engaged in interstate supply.',
    benefits: [
      'Legal recognition as a supplier',
      'Input Tax Credit (ITC) benefits',
      'Inter-state sales without restrictions',
      'Build trust with customers'
    ]
  },
  {
    id: 'gst-filing',
    title: 'GST Filing',
    description: 'Timely and accurate GST return filing to avoid late fees and penalties.',
    fullDescription: 'Every GST-registered business must file monthly or quarterly returns. We ensure your data is accurate and filed on time.',
    benefits: [
      'Avoid heavy late fees',
      'Maintain good compliance score',
      'Smooth ITC reconciliation',
      'Peace of mind'
    ]
  },
  {
    id: 'msme',
    title: 'MSME Registration',
    description: 'Get your Udyam Aadhar and enjoy various government schemes and benefits.',
    fullDescription: 'MSME registration (Udyam) provides various benefits like lower interest rates on loans, subsidies, and protection against delayed payments.',
    benefits: [
      'Collateral-free loans',
      'Subsidy on patent registration',
      'Lower electricity bills',
      'Preference in government tenders'
    ]
  },
  {
    id: 'pan',
    title: 'PAN Card Services',
    description: 'New PAN card application and corrections made simple and fast.',
    fullDescription: 'Permanent Account Number (PAN) is essential for all financial transactions. We help with new applications and corrections.',
    benefits: [
      'Mandatory for opening bank accounts',
      'Essential for high-value transactions',
      'Proof of identity',
      'Required for filing ITR'
    ]
  },
  {
    id: 'business-reg',
    title: 'Business Registration',
    description: 'Start your business journey with the right legal structure and registration.',
    fullDescription: 'Choosing the right business structure (Proprietorship, Partnership, LLP, or Pvt Ltd) is crucial for long-term success.',
    benefits: [
      'Legal protection',
      'Separate legal entity',
      'Easier to raise capital',
      'Perpetual succession'
    ]
  }
];

export const UPDATES: Update[] = [
  {
    id: '1',
    date: 'March 15, 2026',
    title: 'ITR Filing Season is Here!',
    description: 'Don\'t wait for the last minute. Start gathering your documents for ITR filing FY 2025-26.',
    category: 'Income Tax'
  },
  {
    id: '2',
    date: 'March 10, 2026',
    title: 'New GST Rules for Small Businesses',
    description: 'Government has introduced new simplified rules for businesses with turnover below 50 Lakhs.',
    category: 'GST'
  },
  {
    id: '3',
    date: 'March 05, 2026',
    title: 'MSME Benefits Expanded',
    description: 'New subsidies announced for MSMEs in the manufacturing sector. Contact us for details.',
    category: 'MSME'
  }
];
