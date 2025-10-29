import { defineField, defineType } from "sanity";

export default defineType({
  name: "service",
  title: "Dịch vụ",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Tiêu đề dịch vụ",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "icon",
      title: "Biểu tượng/Hình ảnh",
      type: "image",
      options: {
        hotspot: true,
      },
      description: "Biểu tượng hoặc hình minh họa đại diện cho dịch vụ",
    }),
    defineField({
      name: "shortDescription",
      title: "Mô tả ngắn",
      type: "text",
      rows: 2,
      description: "Một câu mô tả ngắn gọn",
      validation: (Rule) => Rule.max(150),
    }),
    defineField({
      name: "fullDescription",
      title: "Mô tả chi tiết",
      type: "array",
      of: [{ type: "block" }],
      description: "Mô tả chi tiết về dịch vụ",
    }),
    defineField({
      name: "features",
      title: "Các tính năng chính",
      type: "array",
      of: [{ type: "string" }],
      description: "Các điểm chính có trong dịch vụ",
    }),
    defineField({
      name: "technologies",
      title: "Công nghệ",
      type: "array",
      of: [{ type: "reference", to: [{ type: "skill" }] }],
    }),
    defineField({
      name: "deliverables",
      title: "Các sản phẩm giao",
      type: "array",
      of: [{ type: "string" }],
      description: "Các sản phẩm mà khách hàng nhận được",
    }),
    defineField({
      name: "pricing",
      title: "Bảng giá",
      type: "object",
      fields: [
        {
          name: "startingPrice",
          title: "Giá khởi điểm (VND)",
          type: "number",
        },
        {
          name: "priceType",
          title: "Loại giá",
          type: "string",
          options: {
            list: [
              { title: "Mỗi giờ", value: "hourly" },
              { title: "Mỗi dự án", value: "project" },
              { title: "Hàng tháng", value: "monthly" },
              { title: "Hoa hồng", value: "custom" },
            ],
          },
        },
        {
          name: "description",
          title: "Mô tả giá",
          type: "text",
          rows: 2,
        },
      ],
    }),
    defineField({
      name: "timeline",
      title: "Dòng thời gian điển hình",
      type: "string",
      description: "E.g., '2-4 weeks', '1-3 months'",
    }),
    defineField({
      name: "featured",
      title: "Dịch vụ nổi bật",
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
      media: "icon",
      featured: "featured",
    },
    prepare(selection) {
      const { title, media, featured } = selection;
      return {
        title: featured ? `⭐ ${title}` : title,
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
  ],
});
