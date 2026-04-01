'use client';

import { ContentListPage, type ColumnDef } from '@/components/admin/content-list-page';
import { ContentFormDialog, type FieldConfig } from '@/components/admin/content-form-dialog';
import { admissionStepsCreateSchema, admissionStepsUpdateSchema } from '@/backend/services/schemas';

const COLUMNS: ColumnDef[] = [
  { key: 'title', label: 'Title' },
  { key: 'icon', label: 'Icon' },
];

const FIELDS: FieldConfig[] = [
  { name: 'icon', label: 'Icon', type: 'text' },
  { name: 'title', label: 'Title', type: 'bilingual-input', required: true },
  { name: 'description', label: 'Description', type: 'bilingual-textarea' },
];

const AdmissionStepsPage = () => (
  <ContentListPage
    title="Admission Steps"
    apiPath="/api/admin/admission-steps"
    columns={COLUMNS}
    previewFields={FIELDS}
    renderForm={({ open, onClose, editItem, onSuccess }) => (
      <ContentFormDialog
        open={open}
        onClose={onClose}
        onSuccess={onSuccess}
        apiPath="/api/admin/admission-steps"
        schema={editItem ? admissionStepsUpdateSchema : admissionStepsCreateSchema}
        fields={FIELDS}
        editItem={editItem}
        title="Admission Step"
      />
    )}
  />
);

export default AdmissionStepsPage;
