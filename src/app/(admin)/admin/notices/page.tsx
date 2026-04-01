'use client';

import { ContentListPage, type ColumnDef } from '@/components/admin/content-list-page';
import { ContentFormDialog, type FieldConfig } from '@/components/admin/content-form-dialog';
import { noticesCreateSchema, noticesUpdateSchema } from '@/backend/services/schemas';

const COLUMNS: ColumnDef[] = [
  { key: 'title', label: 'Title' },
  { key: 'date', label: 'Date' },
];

const FIELDS: FieldConfig[] = [
  { name: 'title', label: 'Title', type: 'bilingual-input', required: true },
  { name: 'date', label: 'Date', type: 'date', required: true },
  { name: 'excerpt', label: 'Excerpt', type: 'bilingual-textarea' },
  { name: 'pdf_url', label: 'PDF URL', type: 'text', placeholder: 'Google Drive PDF URL' },
];

const NoticesPage = () => (
  <ContentListPage
    title="Notices"
    apiPath="/api/admin/notices"
    columns={COLUMNS}
    previewFields={FIELDS}
    renderForm={({ open, onClose, editItem, onSuccess }) => (
      <ContentFormDialog
        open={open}
        onClose={onClose}
        onSuccess={onSuccess}
        apiPath="/api/admin/notices"
        schema={editItem ? noticesUpdateSchema : noticesCreateSchema}
        fields={FIELDS}
        editItem={editItem}
        title="Notice"
      />
    )}
  />
);

export default NoticesPage;
