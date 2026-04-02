'use client';

import { ContentListPage, type ColumnDef } from '@/components/admin/content-list-page';
import { ContentFormDialog, type FieldConfig } from '@/components/admin/content-form-dialog';
import { faqsCreateSchema, faqsUpdateSchema } from '@/backend/services/schemas';

const COLUMNS: ColumnDef[] = [
  { key: 'question', label: 'Question' },
];

const FIELDS: FieldConfig[] = [
  { name: 'question', label: 'Question', type: 'bilingual-input', required: true },
  { name: 'answer', label: 'Answer', type: 'bilingual-textarea', required: true },
];

const FaqsPage = () => (
  <ContentListPage
    title="FAQs"
    apiPath="/api/admin/faqs"
    columns={COLUMNS}
    previewFields={FIELDS}
    renderForm={({ open, onClose, editItem, onSuccess }) => (
      <ContentFormDialog
        open={open}
        onClose={onClose}
        onSuccess={onSuccess}
        apiPath="/api/admin/faqs"
        schema={editItem ? faqsUpdateSchema : faqsCreateSchema}
        fields={FIELDS}
        editItem={editItem}
        title="FAQ"
      />
    )}
  />
);

export default FaqsPage;
