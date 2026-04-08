'use client';

import { SubmissionInboxPage } from '@/components/admin/submission-inbox-page';

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: string;
  created_at: string;
}

const ContactSubmissionsPage = () => (
  <SubmissionInboxPage<ContactSubmission>
    title="Contact Messages"
    description="Messages submitted from the public contact form."
    apiPath="/api/admin/contact-submissions"
    emptyMessage="No contact messages yet."
    columns={[
      {
        key: 'sender',
        label: 'Sender',
        render: (item) => (
          <div>
            <p className="font-medium">{item.name}</p>
            <p className="text-xs text-muted-foreground">{item.email}</p>
            <p className="text-xs text-muted-foreground">{item.phone}</p>
          </div>
        ),
      },
      {
        key: 'subject',
        label: 'Subject',
        render: (item) => item.subject,
      },
      {
        key: 'message',
        label: 'Message',
        render: (item) => <p className="line-clamp-4">{item.message}</p>,
      },
    ]}
  />
);

export default ContactSubmissionsPage;
