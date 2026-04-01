'use client';

import { ContentListPage, type ColumnDef } from '@/components/admin/content-list-page';
import { ContentFormDialog, type FieldConfig } from '@/components/admin/content-form-dialog';
import { paymentMethodsCreateSchema, paymentMethodsUpdateSchema } from '@/backend/services/schemas';

const COLUMNS: ColumnDef[] = [
  { key: 'name', label: 'Name' },
  { key: 'icon', label: 'Icon' },
];

const FIELDS: FieldConfig[] = [
  { name: 'name', label: 'Name', type: 'bilingual-input', required: true },
  { name: 'icon', label: 'Icon', type: 'text' },
  { name: 'color', label: 'Color', type: 'text', placeholder: '#hex' },
];

const PaymentMethodsPage = () => (
  <ContentListPage
    title="Payment Methods"
    apiPath="/api/admin/payment-methods"
    columns={COLUMNS}
    previewFields={FIELDS}
    renderForm={({ open, onClose, editItem, onSuccess }) => (
      <ContentFormDialog
        open={open}
        onClose={onClose}
        onSuccess={onSuccess}
        apiPath="/api/admin/payment-methods"
        schema={editItem ? paymentMethodsUpdateSchema : paymentMethodsCreateSchema}
        fields={FIELDS}
        editItem={editItem}
        title="Payment Method"
      />
    )}
  />
);

export default PaymentMethodsPage;
