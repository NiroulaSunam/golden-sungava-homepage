'use client';

import { ContentListPage, type ColumnDef } from '@/components/admin/content-list-page';
import { ContentFormDialog, type FieldConfig } from '@/components/admin/content-form-dialog';
import { downloadsCreateSchema, downloadsUpdateSchema } from '@/backend/services/schemas';

const COLUMNS: ColumnDef[] = [
  { key: 'title', label: 'Title' },
  { key: 'file_url', label: 'File URL' },
];

const FIELDS: FieldConfig[] = [
  { name: 'title', label: 'Title', type: 'bilingual-input', required: true },
  { name: 'description', label: 'Description', type: 'bilingual-textarea' },
  { name: 'file_url', label: 'File URL', type: 'text', required: true, placeholder: 'https://...' },
];

const DownloadsPage = () => (
  <ContentListPage
    title="Downloads"
    apiPath="/api/admin/downloads"
    columns={COLUMNS}
    manualOrder
    defaultSortBy="sort_order"
    defaultSortOrder="asc"
    previewFields={FIELDS}
    renderForm={({ open, onClose, editItem, onSuccess }) => (
      <ContentFormDialog
        open={open}
        onClose={onClose}
        onSuccess={onSuccess}
        apiPath="/api/admin/downloads"
        schema={editItem ? downloadsUpdateSchema : downloadsCreateSchema}
        fields={FIELDS}
        editItem={editItem}
        title="Download"
      />
    )}
  />
);

export default DownloadsPage;
