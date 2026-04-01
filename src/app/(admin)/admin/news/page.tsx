'use client';

import { ContentListPage, type ColumnDef } from '@/components/admin/content-list-page';
import { ContentFormDialog, type FieldConfig } from '@/components/admin/content-form-dialog';
import { newsCreateSchema, newsUpdateSchema } from '@/backend/services/schemas';

const COLUMNS: ColumnDef[] = [
  { key: 'title', label: 'Title' },
  { key: 'date', label: 'Date' },
  { key: 'category', label: 'Category' },
];

const FIELDS: FieldConfig[] = [
  { name: 'title', label: 'Title', type: 'bilingual-input', required: true },
  { name: 'date', label: 'Date', type: 'date', required: true },
  { name: 'excerpt', label: 'Excerpt', type: 'bilingual-textarea' },
  { name: 'image_url', label: 'Image', type: 'image-url' },
  { name: 'category', label: 'Category', type: 'text' },
  { name: 'content', label: 'Content', type: 'bilingual-rich-text' },
];

const NewsPage = () => (
  <ContentListPage
    title="News"
    apiPath="/api/admin/news"
    columns={COLUMNS}
    renderForm={({ open, onClose, editItem, onSuccess }) => (
      <ContentFormDialog
        open={open}
        onClose={onClose}
        onSuccess={onSuccess}
        apiPath="/api/admin/news"
        schema={editItem ? newsUpdateSchema : newsCreateSchema}
        fields={FIELDS}
        editItem={editItem}
        title="News Article"
      />
    )}
  />
);

export default NewsPage;
