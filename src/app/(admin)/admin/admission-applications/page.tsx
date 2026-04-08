'use client';

import { Printer } from 'lucide-react';
import { SubmissionInboxPage } from '@/components/admin/submission-inbox-page';
import { Button } from '@/components/ui/button';

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

const escapeHtml = (value: string) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#39;');

const printAdmissionApplication = (application: AdmissionApplication) => {
  const printWindow = window.open('', '_blank', 'width=900,height=700');
  if (!printWindow) return;

  const receivedAt = new Date(application.created_at).toLocaleString();

  printWindow.document.write(`
    <!doctype html>
    <html>
      <head>
        <title>Admission Application - ${escapeHtml(application.student_name)}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 32px; color: #111827; }
          h1 { margin-bottom: 8px; }
          .meta { margin-bottom: 24px; color: #4b5563; }
          .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
          .section { margin-top: 18px; }
          .label { font-weight: 700; margin-bottom: 6px; }
          .box { border: 1px solid #d1d5db; border-radius: 8px; padding: 14px; white-space: pre-wrap; min-height: 22px; }
        </style>
      </head>
      <body>
        <h1>Admission Application</h1>
        <p class="meta">Received: ${receivedAt}</p>
        <div class="grid">
          <div class="section"><div class="label">Student Name</div><div class="box">${escapeHtml(application.student_name)}</div></div>
          <div class="section"><div class="label">Grade</div><div class="box">${escapeHtml(application.grade)}</div></div>
          <div class="section"><div class="label">Date of Birth</div><div class="box">${escapeHtml(application.dob)}</div></div>
          <div class="section"><div class="label">Parent / Guardian</div><div class="box">${escapeHtml(application.parent_name)}</div></div>
          <div class="section"><div class="label">Parent Phone</div><div class="box">${escapeHtml(application.parent_phone)}</div></div>
          <div class="section"><div class="label">Email</div><div class="box">${escapeHtml(application.email)}</div></div>
        </div>
        <div class="section"><div class="label">Address</div><div class="box">${escapeHtml(application.address)}</div></div>
      </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
};

const AdmissionApplicationsPage = () => (
  <SubmissionInboxPage<AdmissionApplication>
    title="Admission Applications"
    description="Applications submitted from the public admission form."
    apiPath="/api/admin/admission-applications"
    emptyMessage="No admission applications yet."
    renderActions={(item) => (
      <Button
        type="button"
        size="icon"
        variant="outline"
        onClick={() => printAdmissionApplication(item)}
        aria-label="Print admission application"
      >
        <Printer className="h-4 w-4" />
      </Button>
    )}
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
