'use client';

import { ContentListPage, type ColumnDef } from '@/components/admin/content-list-page';
import { ContentFormDialog, type FieldConfig } from '@/components/admin/content-form-dialog';
import { eventsCreateSchema, eventsUpdateSchema } from '@/backend/services/schemas';

const COLUMNS: ColumnDef[] = [
  { key: 'title', label: 'Title' },
  { key: 'date', label: 'Date' },
  { key: 'venue', label: 'Venue' },
];

const FIELDS: FieldConfig[] = [
  { name: 'title', label: 'Title', type: 'bilingual-input', required: true },
  { name: 'date', label: 'Date', type: 'date', required: true },
  { name: 'time', label: 'Time', type: 'text' },
  { name: 'venue', label: 'Venue', type: 'bilingual-input' },
  { name: 'description', label: 'Description', type: 'bilingual-textarea' },
  { name: 'image_url', label: 'Image', type: 'image-url' },
];

const EventsPage = () => (
  <ContentListPage
    title="Events"
    apiPath="/api/admin/events"
    columns={COLUMNS}
    renderForm={({ open, onClose, editItem, onSuccess }) => (
      <ContentFormDialog
        open={open}
        onClose={onClose}
        onSuccess={onSuccess}
        apiPath="/api/admin/events"
        schema={editItem ? eventsUpdateSchema : eventsCreateSchema}
        fields={FIELDS}
        editItem={editItem}
        title="Event"
      />
    )}
  />
);

export default EventsPage;
