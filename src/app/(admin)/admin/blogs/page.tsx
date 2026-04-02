'use client';

import { ContentListPage, type ColumnDef } from '@/components/admin/content-list-page';
import { ContentFormDialog, type FieldConfig } from '@/components/admin/content-form-dialog';
import { blogsCreateSchema, blogsUpdateSchema } from '@/backend/services/schemas';

const COLUMNS: ColumnDef[] = [
  { key: 'title', label: 'Title' },
  { key: 'date', label: 'Date' },
  { key: 'author', label: 'Author' },
];

const FIELDS: FieldConfig[] = [
  { name: 'title', label: 'Title', type: 'bilingual-input', required: true },
  { name: 'date', label: 'Date', type: 'date', required: true },
  { name: 'author', label: 'Author', type: 'text' },
  { name: 'author_role', label: 'Author Role', type: 'text' },
  { name: 'excerpt', label: 'Excerpt', type: 'bilingual-textarea' },
  { name: 'image_url', label: 'Image', type: 'image-url' },
  { name: 'content', label: 'Content', type: 'bilingual-rich-text' },
];

const BlogsPage = () => (
  <ContentListPage
    title="Blogs"
    apiPath="/api/admin/blogs"
    columns={COLUMNS}
    previewFields={FIELDS}
    renderForm={({ open, onClose, editItem, onSuccess }) => (
      <ContentFormDialog
        open={open}
        onClose={onClose}
        onSuccess={onSuccess}
        apiPath="/api/admin/blogs"
        schema={editItem ? blogsUpdateSchema : blogsCreateSchema}
        fields={FIELDS}
        editItem={editItem}
        title="Blog Post"
      />
    )}
  />
);

export default BlogsPage;
