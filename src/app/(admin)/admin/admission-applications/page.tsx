'use client';

import { SubmissionInboxPage } from '@/components/admin/submission-inbox-page';

interface AdmissionApplication {
  id: string;
  student_name: string;
  dob: string;
  grade: string;
  parent_name: string;
  parent_phone: string;
  email: string;
  address: string;
  status: string;
  created_at: string;
}

const AdmissionApplicationsPage = () => (
  <SubmissionInboxPage<AdmissionApplication>
    title="Admission Applications"
    description="Applications submitted from the public admission form."
    apiPath="/api/admin/admission-applications"
    emptyMessage="No admission applications yet."
    columns={[
      {
        key: 'student',
        label: 'Student',
        render: (item) => (
          <div>
            <p className="font-medium">{item.student_name}</p>
            <p className="text-xs text-muted-foreground">Grade: {item.grade}</p>
            <p className="text-xs text-muted-foreground">DOB: {item.dob}</p>
          </div>
        ),
      },
      {
        key: 'guardian',
        label: 'Guardian',
        render: (item) => (
          <div>
            <p>{item.parent_name}</p>
            <p className="text-xs text-muted-foreground">{item.parent_phone}</p>
            <p className="text-xs text-muted-foreground">{item.email}</p>
          </div>
        ),
      },
      {
        key: 'address',
        label: 'Address',
        render: (item) => <p className="line-clamp-3">{item.address}</p>,
      },
    ]}
  />
);

export default AdmissionApplicationsPage;
