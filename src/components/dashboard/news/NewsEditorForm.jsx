import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Card from '../../ui/Card';
import Input from '../../ui/Input';
import Select from '../../ui/Select';
import Button from '../../ui/Button';
import Textarea from '../../ui/Textarea';
import NewsStatusBadge from './NewsStatusBadge';
import ImageUpload from './ImageUpload';
import { NEWS_STATUS } from '../../../lib/constants';

const categories = [
  'Policy & Governance',
  'Programmes & Events',
  'Community Impact',
  'Careers & Opportunities',
  'Service Delivery'
];

const defaultValues = {
  id: null,
  title: '',
  summary: '',
  content: '',
  category: categories[0],
  tags: '',
  imageUrl: ''
};

const NewsEditorForm = ({
  article,
  isSaving,
  isSubmitting,
  onSaveDraft,
  onSubmitForApproval
}) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues
  });

  useEffect(() => {
    register('content', { required: 'Content is required' });
  }, [register]);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false
      }),
      Image,
      Placeholder.configure({
        placeholder: 'Write the full story, add context, and format with headings…'
      })
    ],
    content: defaultValues.content,
    onUpdate({ editor: tiptap }) {
      setValue('content', tiptap.getHTML(), { shouldDirty: true });
    }
  });

  useEffect(() => {
    reset({ ...defaultValues, ...article });
    if (article?.content && editor) {
      editor.commands.setContent(article.content, false);
    }
    if (!article && editor) {
      editor.commands.clearContent();
    }
  }, [article, reset, editor]);

  const currentImage = watch('imageUrl');

  const handleImageChange = (payload) => {
    if (!payload) {
      setValue('imageUrl', '');
      return;
    }
    setValue('imageUrl', payload.url, { shouldDirty: true });
  };

  const normalizeTags = (tags) => {
    if (!tags) return [];
    if (Array.isArray(tags)) return tags.map((t) => String(t).trim()).filter(Boolean);
    return String(tags)
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
  };

  const onSave = handleSubmit(async (values) => {
    const payload = { ...values, tags: normalizeTags(values.tags) };
    await onSaveDraft?.(payload);
  });

  const onSubmitApproval = handleSubmit(async (values) => {
    const payload = { ...values, tags: normalizeTags(values.tags) };
    await onSubmitForApproval?.(payload);
  });

  return (
    <div className="space-y-6">
      <Card className="p-6 space-y-6">
        <div className="flex flex-wrap justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-gov-gray-500">Article status</p>
            <div className="mt-1">
              <NewsStatusBadge status={article?.status || NEWS_STATUS.DRAFT} />
            </div>
          </div>
          {article?.rejectionNotes && (
            <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 max-w-md">
              <p className="text-sm font-medium text-red-700">Revision requested</p>
              <p className="text-xs text-red-600 mt-1">{article.rejectionNotes}</p>
            </div>
          )}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <Input
              label="Headline"
              placeholder="Enter a clear, descriptive title"
              required
              error={errors.title?.message}
              {...register('title', { required: 'Title is required' })}
            />
            <Textarea
              label="Summary"
              rows={3}
              placeholder="Short summary shown on cards and previews"
              required
              error={errors.summary?.message}
              {...register('summary', { required: 'Summary is required' })}
            />
            <div className="space-y-2">
              <label className="text-sm font-medium text-gov-gray-900">Full article</label>
              <Card className="p-0 overflow-hidden">
                <div className="prose prose-sm sm:prose-base max-w-none">
                  <EditorContent editor={editor} className="min-h-[280px] px-4 py-3 focus-visible:outline-none" />
                </div>
              </Card>
              {errors.content && (
                <p className="text-sm text-red-600">{errors.content.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <Select
                label="Category"
                {...register('category', { required: 'Category is required' })}
                error={errors.category?.message}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </Select>
              <Input
                label="Tags"
                placeholder="Comma-separated keywords"
                {...register('tags')}
              />
            </div>

            <ImageUpload value={currentImage} onChange={handleImageChange} />
          </div>
        </div>
      </Card>

      <div className="flex flex-col sm:flex-row sm:justify-end gap-3">
        <Button type="button" variant="outline" onClick={onSave} disabled={isSaving || isSubmitting}>
          {isSaving ? 'Saving…' : 'Save as Draft'}
        </Button>
        <Button type="button" onClick={onSubmitApproval} disabled={isSubmitting || isSaving}>
          {isSubmitting ? 'Submitting…' : 'Submit for Approval'}
        </Button>
      </div>
    </div>
  );
};

export default NewsEditorForm;
