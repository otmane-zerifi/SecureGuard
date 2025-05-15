interface Vendor {
  id: number;
  name: string;
  category: string;
  risk: string;
  lastAssessment: string;
  complianceScore: number;
}

const mockVendors: Vendor[] = [
  { id: 1, name: 'Acme Cloud Solutions', category: 'Cloud Services', risk: 'High', lastAssessment: '2023-10-15', complianceScore: 68 },
  { id: 2, name: 'BetaSoft Technologies', category: 'Software', risk: 'Medium', lastAssessment: '2023-11-22', complianceScore: 82 },
  { id: 3, name: 'CyberSafe Security', category: 'Security', risk: 'Low', lastAssessment: '2023-12-05', complianceScore: 96 },
  { id: 4, name: 'DataStream Analytics', category: 'Data Processing', risk: 'Medium', lastAssessment: '2023-09-30', complianceScore: 78 },
  { id: 5, name: 'EagleEye Monitoring', category: 'Security', risk: 'Low', lastAssessment: '2023-11-18', complianceScore: 94 },
  { id: 6, name: 'FutureScale Hosting', category: 'Cloud Services', risk: 'High', lastAssessment: '2023-10-07', complianceScore: 65 },
  { id: 7, name: 'GlobalNet Infrastructure', category: 'Infrastructure', risk: 'Medium', lastAssessment: '2023-12-12', complianceScore: 81 },
  { id: 8, name: 'HyperSecure Systems', category: 'Security', risk: 'Low', lastAssessment: '2023-11-05', complianceScore: 93 },
  { id: 9, name: 'InnovateIT Solutions', category: 'Software', risk: 'High', lastAssessment: '2023-09-28', complianceScore: 62 },
  { id: 10, name: 'JetStream Technologies', category: 'Cloud Services', risk: 'Medium', lastAssessment: '2023-12-01', complianceScore: 79 }
];

export default mockVendors;