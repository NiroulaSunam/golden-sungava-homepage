'use client';

import { ContentListPage, type ColumnDef } from '@/components/admin/content-list-page';
import { ContentFormDialog, type FieldConfig } from '@/components/admin/content-form-dialog';
import { activitiesCreateSchema, activitiesUpdateSchema } from '@/backend/services/schemas';

const COLUMNS: ColumnDef[] = [
  { key: 'name', label: 'Name' },
];

const FIELDS: FieldConfig[] = [
  { name: 'name', label: 'Name', type: 'bilingual-input', required: true },
  { name: 'description', label: 'Description', type: 'bilingual-textarea' },
  { name: 'image_url', label: 'Image', type: 'image-url' },
];

const ActivitiesPage = () => (
  <ContentListPage
    title="Activities"
    apiPath="/api/admin/activities"
    columns={COLUMNS}
    previewFields={FIELDS}
    renderForm={({ open, onClose, editItem, onSuccess }) => (
      <ContentFormDialog
        open={open}
        onClose={onClose}
        onSuccess={onSuccess}
        apiPath="/api/admin/activities"
        schema={editItem ? activitiesUpdateSchema : activitiesCreateSchema}
        fields={FIELDS}
        editItem={editItem}
        title="Activity"
      />
    )}
  />
);

export default ActivitiesPage;
