import type {
  ControllerRenderProps,
  FieldValues,
  Path,
  UseFormReturn,
} from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  type DetailedHTMLProps,
  type InputHTMLAttributes,
  useRef,
  useState,
} from "react";
import {
  FileImage,
  FileSpreadsheet,
  FileText,
  type LucideProps,
  Presentation,
  File as DefaultFile,
  CircleX,
  Paperclip,
} from "lucide-react";

interface FileInputProps<T extends FieldValues>
  extends Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    "ref" | "form"
  > {
  label: string;
  form: UseFormReturn<T>;
  name: Path<T>;
  description?: string;
}

export const FileInput = <T extends FieldValues>({
  form,
  label,
  name,
  description,
  multiple = false,
  ...rest
}: FileInputProps<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <DragAndDrop
              field={field}
              multiple={multiple}
              {...rest}
              form={form}
              name={name}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
        </FormItem>
      )}
    />
  );
};

interface DragAndDropProps<T extends FieldValues>
  extends Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    "ref" | "form"
  > {
  field: ControllerRenderProps<T, Path<T>>;
  form: UseFormReturn<T>;
  name: Path<T>;
}
const DragAndDrop = <T extends FieldValues>({
  form,
  name,
  field,
  multiple = false,
  className,
  ...rest
}: DragAndDropProps<T>) => {
  const getInitialFiles = (): FileItem[] => {
    if (!field.value) return [];
    if (Array.isArray(field.value)) {
      return field.value.map((file: File) => ({
        id: crypto.randomUUID(),
        file,
      }));
    }
    return [{ id: crypto.randomUUID(), file: field.value }];
  };
  // Transform dot notation name to nested property access for errors
  const getError = () => {
    if (!name) return undefined;
    const path = name.split(".");
    let errorObj: any = form.formState.errors;
    for (const key of path) {
      if (errorObj && typeof errorObj === "object" && key in errorObj) {
        errorObj = errorObj[key];
      } else {
        return undefined;
      }
    }
    return (
      errorObj?.message || (typeof errorObj === "string" ? errorObj : undefined)
    );
  };
  const fileError = getError();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploadedFiles, setUploadedFiles] = useState<FileItem[]>(
    getInitialFiles()
  );
  const handleAdd = (files: FileList | null) => {
    if (files) {
      const filesArrived: FileItem[] = Array.from(files).map((file) => ({
        id: crypto.randomUUID(),
        file,
      }));
      const updatedFiles = multiple
        ? [...uploadedFiles, ...filesArrived]
        : filesArrived;
      setUploadedFiles(updatedFiles);
      const finalAnswer = multiple
        ? updatedFiles.map((uf) => uf.file)
        : updatedFiles[0].file;
      field.onChange(finalAnswer);
      // 🔁 Reset file input so it allows re-uploading the same file
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  const HandleElimination = (id: string) => {
    const updatedFiles = uploadedFiles.filter((upf) => upf.id !== id);
    setUploadedFiles(updatedFiles);
    const finalAnswer = multiple ? updatedFiles.map((uf) => uf.file) : null;
    field.onChange(finalAnswer);
  };
  return (
    <>
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleAdd(e.dataTransfer.files);
        }}
        className={`border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-gray-500 transition min-h-[139.2px] ${className}`}
      >
        {uploadedFiles.length === 0 ? (
          <div className="flex flex-col items-center">
            <Paperclip size={80} strokeWidth={1.5} className="text-gray-400" />
            <p className="text-gray-500">
              {multiple
                ? "Adjunte los archivos aquí."
                : "Adjunte el archivo aquí."}
            </p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-x-4 justify-center">
            {uploadedFiles.map((fl) => (
              <DADFile
                fileItem={fl}
                key={fl.id}
                onElimination={HandleElimination}
              />
            ))}
          </div>
        )}
        <Input
          type="file"
          multiple={multiple}
          className="hidden"
          ref={inputRef}
          onChange={(e) => handleAdd(e.target.files)}
          {...rest}
        />
      </div>
      {fileError && (
        <div className="mt-2 flex items-center justify-center">
          <span className="text-sm font-medium text-destructive bg-destructive/10 rounded-md px-3 py-1">
            {fileError}
          </span>
        </div>
      )}
    </>
  );
};

interface FileItem {
  file: File;
  id: string;
}
interface DADFile {
  //Drag and Drop File
  fileItem: FileItem;
  onElimination: (id: string) => void;
}
const DADFile = ({ fileItem: { file, id }, onElimination }: DADFile) => {
  const mapIcon = new Map<
    string,
    React.ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
    >
  >([
    // TEXT / DOCS
    [
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      FileText,
    ],
    ["application/msword", FileText],
    [".docx", FileText],
    [".doc", FileText],
    ["application/pdf", FileText],
    [".pdf", FileText],

    // SPREADSHEETS
    [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      FileSpreadsheet,
    ],
    ["application/vnd.ms-excel", FileSpreadsheet],
    [".xlsx", FileSpreadsheet],
    [".xls", FileSpreadsheet],

    // PRESENTATIONS
    [
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      Presentation,
    ],
    ["application/vnd.ms-powerpoint", Presentation],
    [".pptx", Presentation],
    [".ppt", Presentation],

    // IMAGES
    ["image/jpeg", FileImage],
    ["image/png", FileImage],
    ["image/gif", FileImage],
    ["image/bmp", FileImage],
    ["image/svg+xml", FileImage],
    ["image/webp", FileImage],
    [".jpg", FileImage],
    [".jpeg", FileImage],
    [".png", FileImage],
    [".gif", FileImage],
    [".bmp", FileImage],
    [".svg", FileImage],
    [".webp", FileImage],
  ]);
  const SelectedIcon = mapIcon.get(file.type) ?? DefaultFile;
  return (
    <div className="flex flex-col gap-y-1 border-2 rounded-sm p-1 relative items-center">
      <SelectedIcon size={40} className="text-gray-400" strokeWidth={1.5} />
      <span
        className="text-[12px] overflow-hidden overflow-ellipsis w-30"
        title={file.name}
      >
        {file.name}
      </span>
      <CircleX
        size={15}
        className="absolute -top-2 -right-2 text-red-500 rounded-full bg-white"
        onClick={(e) => {
          e.stopPropagation();
          onElimination(id);
        }}
      />
    </div>
  );
};