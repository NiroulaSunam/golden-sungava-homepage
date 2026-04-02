'use client';

import { ContentListPage, type ColumnDef } from '@/components/admin/content-list-page';
import { ContentFormDialog, type FieldConfig } from '@/components/admin/content-form-dialog';
import { staffCreateSchema, staffUpdateSchema } from '@/backend/services/schemas';

const COLUMNS: ColumnDef[] = [
  { key: 'name', label: 'Name' },
  { key: 'designation', label: 'Designation' },
  { key: 'department', label: 'Department' },
];

const FIELDS: FieldConfig[] = [
  { name: 'name', label: 'Name', type: 'text', required: true },
  { name: 'designation', label: 'Designation', type: 'text', required: true },
  { name: 'department', label: 'Department', type: 'text', required: true },
  { name: 'email', label: 'Email', type: 'text' },
  { name: 'photo_url', label: 'Photo', type: 'image-url' },
];

const StaffPage = () => (
  <ContentListPage
    title="Staff"
    apiPath="/api/admin/staff"
    columns={COLUMNS}
    previewFields={FIELDS}
    renderForm={({ open, onClose, editItem, onSuccess }) => (
      <ContentFormDialog
        open={open}
        onClose={onClose}
        onSuccess={onSuccess}
        apiPath="/api/admin/staff"
        schema={editItem ? staffUpdateSchema : staffCreateSchema}
        fields={FIELDS}
        editItem={editItem}
        title="Staff Member"
      />
    )}
  />
);

export default StaffPage;
