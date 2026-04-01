'use client';

import { ContentListPage, type ColumnDef } from '@/components/admin/content-list-page';
import { ContentFormDialog, type FieldConfig } from '@/components/admin/content-form-dialog';
import { testimonialsCreateSchema, testimonialsUpdateSchema } from '@/backend/services/schemas';

const COLUMNS: ColumnDef[] = [
  { key: 'author_name', label: 'Author' },
  { key: 'role', label: 'Role' },
];

const FIELDS: FieldConfig[] = [
  { name: 'quote', label: 'Quote', type: 'bilingual-textarea', required: true },
  { name: 'author_name', label: 'Author Name', type: 'bilingual-input', required: true },
  { name: 'role', label: 'Role', type: 'text' },
  { name: 'photo_url', label: 'Photo', type: 'image-url' },
];

const TestimonialsPage = () => (
  <ContentListPage
    title="Testimonials"
    apiPath="/api/admin/testimonials"
    columns={COLUMNS}
    renderForm={({ open, onClose, editItem, onSuccess }) => (
      <ContentFormDialog
        open={open}
        onClose={onClose}
        onSuccess={onSuccess}
        apiPath="/api/admin/testimonials"
        schema={editItem ? testimonialsUpdateSchema : testimonialsCreateSchema}
        fields={FIELDS}
        editItem={editItem}
        title="Testimonial"
      />
    )}
  />
);

export default TestimonialsPage;
