import { defineField, defineType } from "sanity";

export default defineType({
  name: "navigation",
  title: "Điều hướng",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Tiêu đề liên kết",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "href",
      title: "URL liên kết",
      type: "string",
      description:
        "Neo trang (ví dụ: '#about') hoặc URL bên ngoài (ví dụ: 'https://github.com/username')",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "icon",
      title: "Tên biểu tượng",
      type: "string",
      description:
        "Tên biểu tượng Tabler (ví dụ: 'IconHome', 'IconBrandGithub')",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "isExternal",
      title: "Liên kết bên ngoài",
      type: "boolean",
      description: "Chuyển đổi nếu liên kết này dẫn đến trang web bên ngoài",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Thứ tự hiển thị",
      type: "number",
      description: "Số nhỏ hơn sẽ xuất hiện trước",
      initialValue: 0,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "href",
      order: "order",
    },
    prepare(selection) {
      const { title, subtitle, order } = selection;
      return {
        title: `${order}. ${title}`,
        subtitle: subtitle,
      };
    },
  },
  orderings: [
    {
      title: "Thứ tự hiển thị",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});
