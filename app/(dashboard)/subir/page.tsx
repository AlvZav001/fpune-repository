'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  Upload,
  FileText,
  X,
  Check,
  ArrowLeft,
  AlertCircle,
  Info,
} from 'lucide-react';
import { careers, categories } from '@/lib/data';

const years = ['2024', '2023', '2022', '2021', '2020'];

export default function UploadPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    career: '',
    year: '',
    category: '',
    description: '',
    tags: [] as string[],
  });
  const [tagInput, setTagInput] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'application/pdf') {
        setUploadedFile(file);
        setErrors((prev) => ({ ...prev, file: '' }));
      } else {
        setErrors((prev) => ({ ...prev, file: 'Solo se permiten archivos PDF' }));
      }
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === 'application/pdf') {
        setUploadedFile(file);
        setErrors((prev) => ({ ...prev, file: '' }));
      } else {
        setErrors((prev) => ({ ...prev, file: 'Solo se permiten archivos PDF' }));
      }
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
  };

  const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(tagInput.trim()) && formData.tags.length < 6) {
        setFormData((prev) => ({
          ...prev,
          tags: [...prev.tags, tagInput.trim()],
        }));
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = 'El título es requerido';
    if (!formData.author.trim()) newErrors.author = 'El autor es requerido';
    if (!formData.career) newErrors.career = 'Selecciona una carrera';
    if (!formData.year) newErrors.year = 'Selecciona un año';
    if (!formData.category) newErrors.category = 'Selecciona una categoría';
    if (!formData.description.trim()) newErrors.description = 'La descripción es requerida';
    if (formData.description.length < 50) newErrors.description = 'La descripción debe tener al menos 50 caracteres';
    if (!uploadedFile) newErrors.file = 'Debes subir un archivo PDF';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    // Simulate upload
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    router.push('/dashboard?uploaded=true');
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Header */}
      <div>
        <Link href="/dashboard">
          <Button variant="ghost" size="sm" className="mb-4 gap-2">
            <ArrowLeft className="h-4 w-4" />
            Volver
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Subir Nuevo Proyecto
        </h1>
        <p className="mt-2 text-muted-foreground">
          Comparte tu proyecto final con la comunidad académica de FPUNE
        </p>
      </div>

      {/* Info Banner */}
      <div className="flex gap-3 rounded-lg border border-border bg-secondary/50 p-4">
        <Info className="h-5 w-5 shrink-0 text-primary" />
        <div className="text-sm text-muted-foreground">
          <p className="font-medium text-foreground">Antes de subir tu proyecto</p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>Asegúrate de que tu proyecto esté en formato PDF</li>
            <li>El archivo no debe superar los 25 MB</li>
            <li>El proyecto será revisado por un administrador antes de publicarse</li>
          </ul>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* File Upload */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="font-semibold text-foreground">Archivo del Proyecto</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Sube el documento PDF de tu proyecto final
          </p>

          <div className="mt-4">
            {!uploadedFile ? (
              <div
                className={`relative rounded-lg border-2 border-dashed transition-colors ${
                  dragActive
                    ? 'border-primary bg-primary/5'
                    : errors.file
                    ? 'border-destructive bg-destructive/5'
                    : 'border-border hover:border-primary/50'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileInput}
                  className="absolute inset-0 cursor-pointer opacity-0"
                />
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Upload className="h-6 w-6" />
                  </div>
                  <p className="mt-4 text-sm font-medium text-foreground">
                    Arrastra y suelta tu archivo aquí
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    o haz clic para seleccionar un archivo
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Solo archivos PDF (máx. 25 MB)
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4 rounded-lg border border-border bg-secondary/50 p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <FileText className="h-6 w-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-foreground">{uploadedFile.name}</p>
                  <p className="text-sm text-muted-foreground">{formatFileSize(uploadedFile.size)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <Check className="h-4 w-4" />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    onClick={removeFile}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
            {errors.file && (
              <p className="mt-2 flex items-center gap-1 text-sm text-destructive">
                <AlertCircle className="h-4 w-4" />
                {errors.file}
              </p>
            )}
          </div>
        </div>

        {/* Project Information */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="font-semibold text-foreground">Información del Proyecto</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Completa los datos de tu proyecto final
          </p>

          <div className="mt-6 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="title">
                Título del proyecto <span className="text-destructive">*</span>
              </Label>
              <Input
                id="title"
                placeholder="Ej: Sistema de Gestión de Inventarios con IA"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className={errors.title ? 'border-destructive' : ''}
              />
              {errors.title && (
                <p className="text-sm text-destructive">{errors.title}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="author">
                Nombre del autor <span className="text-destructive">*</span>
              </Label>
              <Input
                id="author"
                placeholder="Nombre completo del autor"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className={errors.author ? 'border-destructive' : ''}
              />
              {errors.author && (
                <p className="text-sm text-destructive">{errors.author}</p>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="career">
                  Carrera <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={formData.career}
                  onValueChange={(value) => setFormData({ ...formData, career: value })}
                >
                  <SelectTrigger className={errors.career ? 'border-destructive' : ''}>
                    <SelectValue placeholder="Selecciona una carrera" />
                  </SelectTrigger>
                  <SelectContent>
                    {careers.map((career) => (
                      <SelectItem key={career.id} value={career.name}>
                        {career.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.career && (
                  <p className="text-sm text-destructive">{errors.career}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="year">
                  Año <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={formData.year}
                  onValueChange={(value) => setFormData({ ...formData, year: value })}
                >
                  <SelectTrigger className={errors.year ? 'border-destructive' : ''}>
                    <SelectValue placeholder="Selecciona un año" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.year && (
                  <p className="text-sm text-destructive">{errors.year}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">
                Categoría <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger className={errors.category ? 'border-destructive' : ''}>
                  <SelectValue placeholder="Selecciona una categoría" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-sm text-destructive">{errors.category}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">
                Descripción <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="description"
                placeholder="Describe brevemente tu proyecto, objetivos, metodología y resultados..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className={`min-h-[120px] resize-none ${errors.description ? 'border-destructive' : ''}`}
              />
              <div className="flex justify-between text-sm">
                {errors.description ? (
                  <p className="text-destructive">{errors.description}</p>
                ) : (
                  <p className="text-muted-foreground">Mínimo 50 caracteres</p>
                )}
                <p className="text-muted-foreground">{formData.description.length} caracteres</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Etiquetas (opcional)</Label>
              <Input
                id="tags"
                placeholder="Escribe una etiqueta y presiona Enter"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={addTag}
                disabled={formData.tags.length >= 6}
              />
              <p className="text-sm text-muted-foreground">
                Máximo 6 etiquetas. Ejemplo: Python, Machine Learning, Django
              </p>
              {formData.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="gap-1 pr-1">
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-1 rounded-full p-0.5 hover:bg-muted"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Link href="/dashboard">
            <Button type="button" variant="outline" className="w-full sm:w-auto">
              Cancelar
            </Button>
          </Link>
          <Button type="submit" disabled={isLoading} className="w-full gap-2 sm:w-auto">
            {isLoading ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Subiendo...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4" />
                Subir Proyecto
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
