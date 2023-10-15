import { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import InputField from "../atoms/InputField";
import Button from "../atoms/Button";

type FormProps = {
  onSubmit: (data: FormData) => void;
};

type FormData = {
  monthYear: string;
  numberOfTrees: number;
};

const monthYearPattern =
  /^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-\d{4}$/;

function AddNewPurchase({ onSubmit }: FormProps) {
  const [showForm, setShowForm] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>();

  const showFormHandler = () => {
    setShowForm(true);
  };

  const hideFormHandler = () => {
    setShowForm(false);
  };

  const onSubmitHandler: SubmitHandler<FormData> = (data) => {
    onSubmit(data);
    setShowForm(false);
  };

  return (
    <div className="p-2 ">
      <Button
        onClick={showFormHandler}
        label="Add Purchase"
        className="p-2 bg-blue-500 text-white rounded mb-5"
        disabled={showForm}
      />
      {showForm && (
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="flex flex-col xl:flex-row space-y-5 xl:space-y-0">
            <div>
              <Controller
                name="monthYear"
                control={control}
                defaultValue=""
                rules={{
                  required: "Month-Year is required",
                  pattern: {
                    value: monthYearPattern,
                    message: "Format should be MMM-YYYY (e.g. Jan-2029)",
                  },
                }}
                render={({ field }) => (
                  <InputField
                    id="monthYear"
                    label="Month & Year"
                    type="text"
                    value={field.value}
                    onChange={(value) => field.onChange(value)}
                    placeholder="Month-Year"
                  />
                )}
              />
            </div>
            <div>
              <Controller
                name="numberOfTrees"
                control={control}
                defaultValue={0}
                rules={{ required: "Number of Trees is required" }}
                render={({ field }) => (
                  <InputField
                    id="numberOfTrees"
                    label="Number of Trees"
                    type="number"
                    value={field.value.toString()}
                    onChange={(value) => field.onChange(Number(value))}
                    placeholder="Number of Trees"
                  />
                )}
              />
            </div>
            <div className="flex flex-col-reverse xl:flex-row xl:items-end xl:space-x-4 space-y-4 xl:space-y-0">
              <Button
                type="submit"
                className="p-2 bg-blue-500 text-white rounded mt-4 xl:mt-0"
                label="Submit"
              />
              <Button
                type="button"
                onClick={hideFormHandler}
                className="p-2 bg-gray-500 text-white rounded"
                label="Cancel"
              />
            </div>
          </div>
          {errors.monthYear && (
            <div className="text-red-500 mt-2">{errors.monthYear.message}</div>
          )}
          {errors.numberOfTrees && (
            <div className="text-red-500 mt-2">
              {errors.numberOfTrees.message}
            </div>
          )}
        </form>
      )}
    </div>
  );
}

export default AddNewPurchase;
