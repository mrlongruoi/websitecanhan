import { defineField, defineType } from "sanity";

export default defineType({
  name: "testimonial",
  title: "Lời chứng thực",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Tên khách hàng/người dùng",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "position",
      title: "Chức vụ/nhiệm vụ",
      type: "string",
      description: "Ví dụ: 'CTO', 'Product Manager', 'Founder'",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "company",
      title: "Công ty/Tổ chức",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "avatar",
      title: "Hình ảnh/Avatar",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Mô tả hình ảnh",
        },
      ],
    }),
    defineField({
      name: "testimonial",
      title: "Lời chứng thực",
      type: "text",
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "rating",
      title: "Số sao/Đánh giá",
      type: "number",
      description: "1-5 sao",
      validation: (Rule) => Rule.min(1).max(5),
    }),
    defineField({
      name: "date",
      title: "Ngày nhận xét",
      type: "date",
    }),
    defineField({
      name: "linkedinUrl",
      title: "Liên kết LinkedIn",
      type: "url",
      description: "Link đến trang LinkedIn của khách hàng/người dùng",
    }),
    defineField({
      name: "companyLogo",
      title: "Hình ảnh/logo công ty",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "featured",
      title: "Lời chứng thực nổi bật",
      type: "boolean",
      description: "Hiển thị trên trang chủ",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Thứ tự hiển thị",
      description: "Số thứ tự hiển thị trên trang chủ",
      type: "number",
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "company",
      media: "avatar",
      featured: "featured",
    },
    prepare(selection) {
      const { title, subtitle, media, featured } = selection;
      return {
        title: featured ? `⭐ ${title}` : title,
        subtitle: subtitle,
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
