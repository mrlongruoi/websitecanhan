import { defineField, defineType } from "sanity";

export default defineType({
  name: "achievement",
  title: "Thành tích & Huy chương",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Tên thành tích",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "type",
      title: "Loại",
      type: "string",
      options: {
        list: [
          { title: "Huy chương", value: "award" },
          { title: "Hackathon giành chiến thắng", value: "hackathon" },
          { title: "Tạp chí", value: "publication" },
          { title: "Trung tạp", value: "speaking" },
          { title: "Phần mềm miễn phí", value: "open-source" },
          { title: "Cột mốc quan trọng", value: "milestone" },
          { title: "Sự công nhận", value: "recognition" },
          { title: "Khác", value: "other" },
        ],
      },
    }),
    defineField({
      name: "issuer",
      title: "Tổ chức cấp",
      type: "string",
      description: "Who awarded this?",
    }),
    defineField({
      name: "date",
      title: "Ngày nhận",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Mô tả",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "image",
      title: "Hình ảnh chứng nhận",
      type: "image",
      options: {
        hotspot: true,
      },
      description: "Hình ảnh chứng nhận, huy chương, hoặc giấy chứng nhận",
    }),
    defineField({
      name: "url",
      title: "URL",
      type: "url",
      description: "Link đến bài đăng, giấy chứng nhận, hoặc trang liên quan",
    }),
    defineField({
      name: "featured",
      title: "Thành tích nổi bật",
      type: "boolean",
      initialValue: false,
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
      title: "title",
      subtitle: "issuer",
      media: "image",
      type: "type",
    },
    prepare(selection) {
      const { title, subtitle, media, type } = selection;
      return {
        title: title,
        subtitle: `${type} - ${subtitle}`,
        media: media,
      };
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
      by: [{ field: "date", direction: "desc" }],
    },
  ],
});
