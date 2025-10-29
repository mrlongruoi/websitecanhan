import { defineField, defineType } from "sanity";

export default defineType({
  name: "project",
  title: "Dự án",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Tiêu đề dự án",
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
      name: "tagline",
      title: "Mô tả ngắn gọn",
      type: "string",
      description: "Mô tả ngắn gọn về dự án",
      validation: (Rule) => Rule.max(150),
    }),
    defineField({
      name: "coverImage",
      title: "Hình ảnh đại diện",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Mô tả hình ảnh",
          description: "Mô tả hình ảnh để hỗ trợ người đọc",
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "technologies",
      title: "Công nghệ sử dụng",
      type: "array",
      of: [{ type: "reference", to: [{ type: "skill" }] }],
      description: "Chọn từ danh sách công nghệ (tối đa 6)",
      validation: (Rule) => Rule.max(6),
    }),
    defineField({
      name: "category",
      title: "Danh mục dự án",
      type: "string",
      options: {
        list: [
          { title: "Web Application", value: "web-app" },
          { title: "Mobile App", value: "mobile-app" },
          { title: "AI/ML Project", value: "ai-ml" },
          { title: "API/Backend", value: "api-backend" },
          { title: "DevOps/Infrastructure", value: "devops" },
          { title: "Open Source", value: "open-source" },
          { title: "CLI Tool", value: "cli-tool" },
          { title: "Desktop App", value: "desktop-app" },
          { title: "Browser Extension", value: "browser-extension" },
          { title: "Game", value: "game" },
          { title: "Other", value: "other" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "liveUrl",
      title: "Liên kết dự án",
      type: "url",
      description: "Liên kết đến dự án đang hoạt động",
    }),
    defineField({
      name: "githubUrl",
      title: "Liên kết GitHub",
      type: "url",
      description: "Liên kết đến kho lưu trữ GitHub",
    }),
    defineField({
      name: "featured",
      title: "Dự án nổi bật",
      type: "boolean",
      description: "Hiển thị dự án này nổi bật trên trang chủ",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Thứ tự hiển thị",
      type: "number",
      description: "Số nhỏ hơn sẽ hiển thị trước (0-99)",
      initialValue: 0,
      validation: (Rule) => Rule.min(0).max(99),
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "coverImage",
      category: "category",
      featured: "featured",
    },
    prepare(selection) {
      const { title, media, category, featured } = selection;
      return {
        title: featured ? `⭐ ${title}` : title,
        subtitle: category || "Chưa phân loại",
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
      name: "featuredFirst",
      by: [
        { field: "featured", direction: "desc" },
        { field: "order", direction: "asc" },
      ],
    },
  ],
});
