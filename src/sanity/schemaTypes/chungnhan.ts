import { defineField, defineType } from "sanity";

export default defineType({
  name: "certification",
  title: "Chứng nhận",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Tên chứng nhận",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "issuer",
      title: "Nơi cấp",
      type: "string",
      description: "Ví dụ: 'AWS', 'Google Cloud', 'Microsoft'",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "issueDate",
      title: "Ngày cấp",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "expiryDate",
      title: "Hạn sử dụng",
      type: "date",
      description: "Nếu không có hạn sử dụng, để trống",
    }),
    defineField({
      name: "credentialId",
      title: "Mã chứng nhận",
      type: "string",
      description: "ID chứng nhận hoặc số badge",
    }),
    defineField({
      name: "credentialUrl",
      title: "Link xác nhận",
      type: "url",
      description: "Link để xác nhận chứng nhận",
    }),
    defineField({
      name: "logo",
      title: "Logo chứng nhận",
      type: "image",
      options: {
        hotspot: true,
      },
      description: "Upload logo chứng nhận hoặc badge",
    }),
    defineField({
      name: "description",
      title: "Mô tả",
      type: "text",
      rows: 3,
      description: "Mô tả kỹ năng hoặc kiến thức được chứng nhận",
    }),
    defineField({
      name: "skills",
      title: "Kỹ năng liên quan",
      type: "array",
      of: [{ type: "reference", to: [{ type: "skill" }] }],
    }),
    defineField({
      name: "order",
      title: "Thứ tự hiển thị",
      type: "number",
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "issuer",
      media: "logo",
    },
  },
  orderings: [
    {
      title: "Thứ tự hiển thị",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Mới nhất",
      name: "dateDesc",
      by: [{ field: "issueDate", direction: "desc" }],
    },
  ],
});
