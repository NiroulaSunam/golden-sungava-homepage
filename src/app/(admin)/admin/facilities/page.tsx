'use client';

import { ContentListPage, type ColumnDef } from '@/components/admin/content-list-page';
import { ContentFormDialog, type FieldConfig } from '@/components/admin/content-form-dialog';
import { facilitiesCreateSchema, facilitiesUpdateSchema } from '@/backend/services/schemas';

const COLUMNS: ColumnDef[] = [
  { key: 'name', label: 'Name' },
  { key: 'icon', label: 'Icon' },
];

const FIELDS: FieldConfig[] = [
  { name: 'name', label: 'Name', type: 'bilingual-input', required: true },
  { name: 'description', label: 'Description', type: 'bilingual-textarea' },
  { name: 'image_url', label: 'Image', type: 'image-url' },
  { name: 'icon', label: 'Icon', type: 'text', placeholder: 'Lucide icon name' },
];

const FacilitiesPage = () => (
  <ContentListPage
    title="Facilities"
    apiPath="/api/admin/facilities"
    columns={COLUMNS}
    previewFields={FIELDS}
    renderForm={({ open, onClose, editItem, onSuccess }) => (
      <ContentFormDialog
        open={open}
        onClose={onClose}
        onSuccess={onSuccess}
        apiPath="/api/admin/facilities"
        schema={editItem ? facilitiesUpdateSchema : facilitiesCreateSchema}
        fields={FIELDS}
        editItem={editItem}
        title="Facility"
      />
    )}
  />
);

export default FacilitiesPage;
