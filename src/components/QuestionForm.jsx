import { useForm } from 'react-hook-form'
import { Plus } from 'lucide-react'
import { useTracker } from '../context/TrackerContext'
import { CATEGORIES, DIFFICULTIES, STATUSES } from '../utils/constants'
import Button from './ui/Button'
import Card from './ui/Card'
import Field from './ui/Field'
import Input from './ui/Input'
import Select from './ui/Select'

const DEFAULTS = { title: '', category: 'DSA', difficulty: 'Easy', status: 'Pending' }

export default function QuestionForm() {
  const { questions, addQuestion } = useTracker()
  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors },
  } = useForm({ defaultValues: DEFAULTS })

  const onSubmit = (data) => {
    addQuestion(data)
    reset({ ...DEFAULTS, category: data.category, difficulty: data.difficulty })
    setFocus('title')
  }

  const isUnique = (value) =>
    !questions.some((q) => q.title.toLowerCase() === value.trim().toLowerCase()) ||
    'This question is already in your list.'

  return (
    <Card as="form" onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <h2 className="text-base font-semibold">Add a question</h2>

      <Field label="Question" htmlFor="title" error={errors.title?.message}>
        <Input
          id="title"
          type="text"
          placeholder="e.g. Merge two sorted linked lists"
          hasError={!!errors.title}
          {...register('title', {
            required: 'Enter the question you want to practice.',
            minLength: { value: 3, message: 'Use at least 3 characters.' },
            maxLength: { value: 120, message: 'Keep it under 120 characters.' },
            validate: {
              notBlank: (v) => v.trim().length > 0 || 'Enter the question you want to practice.',
              unique: isUnique,
            },
          })}
        />
      </Field>

      <Field label="Category" htmlFor="category" error={errors.category?.message}>
        <Select
          id="category"
          options={CATEGORIES}
          hasError={!!errors.category}
          {...register('category', { required: 'Choose a category.' })}
        />
      </Field>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Difficulty" htmlFor="difficulty" error={errors.difficulty?.message}>
          <Select
            id="difficulty"
            options={DIFFICULTIES}
            hasError={!!errors.difficulty}
            {...register('difficulty', { required: 'Choose a difficulty.' })}
          />
        </Field>
        <Field label="Status" htmlFor="status" error={errors.status?.message}>
          <Select
            id="status"
            options={STATUSES}
            hasError={!!errors.status}
            {...register('status', { required: 'Choose a status.' })}
          />
        </Field>
      </div>

      <Button type="submit" fullWidth>
        <Plus className="h-4 w-4" aria-hidden="true" />
        Add question
      </Button>
    </Card>
  )
}
