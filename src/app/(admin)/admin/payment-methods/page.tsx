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
  { name: 'icon', label: 'Icon', type: 'text', placeholder: 'khalti, esewa, wallet, credit-card, smartphone, banknote, landmark' },
  { name: 'color', label: 'Icon Color', type: 'text', placeholder: '#7c3aed or text-emerald-600' },
  { name: 'qr_code_url', label: 'QR Card Image', type: 'image-url' },
  {
    name: 'steps',
    label: 'Steps',
    type: 'bilingual-list',
    placeholder: {
      en: 'One step per line',
      np: 'प्रत्येक चरण छुट्टै लाइनमा',
    },
  },
];

const PaymentMethodsPage = () => (
  <ContentListPage
    title="Payment Methods"
    apiPath="/api/admin/payment-methods"
    columns={COLUMNS}
    defaultSortBy="sort_order"
    defaultSortOrder="asc"
    manualOrder
    fetchLimit={100}
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
