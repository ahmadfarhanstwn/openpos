import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ZodType } from "zod";

interface IUseFormUnitAndCategorySubmissionProps {
    createMutation: () => any
    onSuccess: () => void,
    handleClose: () => void
    zodObjectSchema: ZodType
}

const useFormUnitAndCategorySubmission = <any>({
    createMutation, onSuccess, handleClose, zodObjectSchema
} : IUseFormUnitAndCategorySubmissionProps)  => {
    const formMethods = useForm<any>({
        resolver: zodResolver(zodObjectSchema)
    })

    const { reset, handleSubmit } = formMethods

    const [mutation, {isLoading, isSuccess, isError, error} ] = createMutation()

    const onSubmitHandlers: SubmitHandler<any> = (values) => {
        mutation(values)
    }

    useEffect(() => {
        if (isSuccess) {
            reset();
            toast.success('Product Unit created successfully');
            handleClose()
            onSuccess()
        }
    
        if (isError) {
          console.log(error);
          if (Array.isArray((error as any).data.error)) {
            (error as any).data.error.forEach((el: any) =>
              toast.error(el.message, {
                position: 'top-right',
              })
            );
          } else {
            toast.error((error as any).data.message, {
              position: 'top-right',
            });
          }
        }
      }, [isLoading, isSuccess]);

    return {
    formMethods,
    onSubmitHandlers,
    handleSubmit,
    isLoading: isLoading,
    };
}

export default useFormUnitAndCategorySubmission