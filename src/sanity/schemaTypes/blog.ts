import { defineField, defineType } from "sanity";

export default defineType({
  name: "blog",
  title: "Bài viết blog",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Tiêu đề",
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
      name: "excerpt",
      title: "Tóm tắt",
      type: "text",
      rows: 3,
      description: "Tóm tắt ngắn gọn cho thẻ xem trước",
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: "featuredImage",
      title: "Hình ảnh nổi bật",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Văn bản thay thế",
        },
      ],
    }),
    defineField({
      name: "category",
      title: "Danh mục",
      type: "string",
      options: {
        list: [
          { title: "Hướng dẫn", value: "tutorial" },
          { title: "Công nghệ", value: "technical" },
          { title: "AI/ML", value: "ai-ml" },
          { title: "Phát triển Web", value: "web-dev" },
          { title: "Nghề nghiệp", value: "career" },
          { title: "Ý kiến", value: "opinion" },
          { title: "Trưng bày dự án", value: "showcase" },
          { title: "Thực tiễn tốt nhất", value: "best-practices" },
          { title: "Tin tức", value: "news" },
        ],
      },
    }),
    defineField({
      name: "tags",
      title: "Thẻ",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    }),
    defineField({
      name: "publishedAt",
      title: "Ngày xuất bản",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "readTime",
      title: "Thời gian đọc (phút)",
      type: "number",
      description: "Thời gian đọc ước tính",
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "featuredImage",
      category: "category",
    },
    prepare(selection) {
      const { title, media, category } = selection;
      return {
        title: title,
        subtitle: category || "Chưa phân loại",
        media: media,
      };
    },
  },
  orderings: [
    {
      title: "Ngày xuất bản, Mới nhất",
      name: "publishedDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
    {
      title: "Ngày xuất bản, Cũ nhất",
      name: "publishedAsc",
      by: [{ field: "publishedAt", direction: "asc" }],
    },
  ],
});
