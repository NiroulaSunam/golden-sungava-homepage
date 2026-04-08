'use client';

import { Printer } from 'lucide-react';
import { SubmissionInboxPage } from '@/components/admin/submission-inbox-page';
import { Button } from '@/components/ui/button';

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

const escapeHtml = (value: string) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#39;');

const printContactSubmission = (submission: ContactSubmission) => {
  const printWindow = window.open('', '_blank', 'width=900,height=700');
  if (!printWindow) return;

  const receivedAt = new Date(submission.created_at).toLocaleString();

  printWindow.document.write(`
    <!doctype html>
    <html>
      <head>
        <title>Contact Message - ${escapeHtml(submission.name)}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 32px; color: #111827; }
          h1 { margin-bottom: 8px; }
          .meta { margin-bottom: 24px; color: #4b5563; }
          .section { margin-top: 20px; }
          .label { font-weight: 700; margin-bottom: 6px; }
          .box { border: 1px solid #d1d5db; border-radius: 8px; padding: 16px; white-space: pre-wrap; }
        </style>
      </head>
      <body>
        <h1>Contact Message</h1>
        <p class="meta">Received: ${receivedAt}</p>
        <div class="section"><div class="label">Name</div><div class="box">${escapeHtml(submission.name)}</div></div>
        <div class="section"><div class="label">Email</div><div class="box">${escapeHtml(submission.email)}</div></div>
        <div class="section"><div class="label">Phone</div><div class="box">${escapeHtml(submission.phone)}</div></div>
        <div class="section"><div class="label">Subject</div><div class="box">${escapeHtml(submission.subject)}</div></div>
        <div class="section"><div class="label">Message</div><div class="box">${escapeHtml(submission.message)}</div></div>
      </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
};

const ContactSubmissionsPage = () => (
  <SubmissionInboxPage<ContactSubmission>
    title="Contact Messages"
    description="Messages submitted from the public contact form."
    apiPath="/api/admin/contact-submissions"
    emptyMessage="No contact messages yet."
    renderActions={(item) => (
      <Button
        type="button"
        size="icon"
        variant="outline"
        onClick={() => printContactSubmission(item)}
        aria-label="Print contact message"
      >
        <Printer className="h-4 w-4" />
      </Button>
    )}
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
