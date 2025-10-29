import { defineField, defineType } from "sanity";

export default defineType({
  name: "contact",
  title: "Gửi biểu mẫu liên hệ",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Tên",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "E-mail",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "subject",
      title: "Tiêu đề",
      type: "string",
    }),
    defineField({
      name: "message",
      title: "Nội dung",
      type: "text",
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "submittedAt",
      title: "Thời gian gửi",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "status",
      title: "Trạng thái",
      type: "string",
      options: {
        list: [
          { title: "Mới", value: "new" },
          { title: "Đã lưu", value: "archived" },
        ],
      },
      initialValue: "new",
    }),
    defineField({
      name: "notes",
      title: "Ghi chú nội bộ",
      type: "text",
      rows: 3,
      description: "Ghi chú nội bộ về yêu cầu này",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "email",
      status: "status",
    },
    prepare(selection) {
      const { title, subtitle, status } = selection;
      const statusEmoji = {
        new: "🆕",
        archived: "📁",
      };
      return {
        title: `${
          statusEmoji[status as keyof typeof statusEmoji] || ""
        } ${title}`,
        subtitle: subtitle,
      };
    },
  },
  orderings: [
    {
      title: "Mới nhất",
      name: "submittedDesc",
      by: [{ field: "submittedAt", direction: "desc" }],
    },
    {
      title: "Trạng thái",
      name: "status",
      by: [{ field: "status", direction: "asc" }],
    },
  ],
});
