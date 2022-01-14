import * as Yup from "yup";

const validator = Yup.object({
  title: Yup.string().required("Title is required.").min(8),
  images: Yup.array().nullable(),
});

export default validator;
