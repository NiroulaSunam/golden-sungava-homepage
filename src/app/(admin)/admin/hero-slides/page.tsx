'use client';

import { ContentListPage, type ColumnDef } from '@/components/admin/content-list-page';
import { ContentFormDialog, type FieldConfig } from '@/components/admin/content-form-dialog';
import { heroSlidesCreateSchema, heroSlidesUpdateSchema } from '@/backend/services/schemas';

const COLUMNS: ColumnDef[] = [
  { key: 'heading', label: 'Heading' },
];

const FIELDS: FieldConfig[] = [
  { name: 'heading', label: 'Heading', type: 'bilingual-input', required: true },
  { name: 'subheading', label: 'Subheading', type: 'bilingual-input' },
  { name: 'image_url', label: 'Image', type: 'image-url' },
  { name: 'cta_text', label: 'CTA Text', type: 'bilingual-input' },
  { name: 'cta_link', label: 'CTA Link', type: 'text' },
];

const HeroSlidesPage = () => (
  <ContentListPage
    title="Hero Slides"
    apiPath="/api/admin/hero-slides"
    columns={COLUMNS}
    previewFields={FIELDS}
    renderForm={({ open, onClose, editItem, onSuccess }) => (
      <ContentFormDialog
        open={open}
        onClose={onClose}
        onSuccess={onSuccess}
        apiPath="/api/admin/hero-slides"
        schema={editItem ? heroSlidesUpdateSchema : heroSlidesCreateSchema}
        fields={FIELDS}
        editItem={editItem}
        title="Hero Slide"
      />
    )}
  />
);

export default HeroSlidesPage;
