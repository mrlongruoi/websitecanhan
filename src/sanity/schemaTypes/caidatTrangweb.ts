import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Cài đặt trang web",
  type: "document",
  fields: [
    defineField({
      name: "siteTitle",
      title: "Tên trang web",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "siteDescription",
      title: "Mô tả trang web",
      type: "text",
      rows: 3,
      description: "Mô tả trang web cho SEO",
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: "siteKeywords",
      title: "Từ khóa SEO",
      type: "array",
      of: [{ type: "string" }],
      description: "Từ khóa SEO",
    }),
    defineField({
      name: "siteLogo",
      title: "Logo trang web",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "favicon",
      title: "Favicon trang web",
      type: "image",
      description: "32x32 px recommended",
    }),
    defineField({
      name: "ogImage",
      title: "Hình ảnh chia sẻ trên mạng xã hội",
      type: "image",
      description:
        "Hình ảnh mặc định khi chia sẻ trang web trên mạng xã hội (1200x630 recommended)",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "primaryColor",
      title: "Màu thương hiệu chính",
      type: "string",
      description: "Mã màu Hex (ví dụ: #3B82F6)",
    }),
    defineField({
      name: "secondaryColor",
      title: "Màu thương hiệu phụ",
      type: "string",
      description: "Mã màu Hex (ví dụ: #3B82F6)",
    }),
    defineField({
      name: "accentColor",
      title: "Màu nhấn",
      type: "string",
      description: "Mã màu hex cho CTA và điểm nổi bật (ví dụ: #EF4444)",
    }),
    defineField({
      name: "ctaText",
      title: "Nội dung CTA chính",
      type: "string",
      description: "Nội dung CTA chính (ví dụ: 'Hire Me', 'Get in Touch')",
    }),
    defineField({
      name: "ctaUrl",
      title: "URL CTA chính",
      type: "string",
      description: "URL mà CTA chính вед đến (ví dụ: #contact, /contact)",
    }),
    defineField({
      name: "heroHeadline",
      title: "Tiêu đề hero",
      type: "string",
      description: "Tiêu đề chính trên trang chủ",
    }),
    defineField({
      name: "heroSubheadline",
      title: "Tiêu đề phụ hero",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "heroBackground",
      title: "Hình nền hero",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "showBlog",
      title: "Hiển thị phần Blog",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "showServices",
      title: "Hiển thị phần Dịch vụ",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "showTestimonials",
      title: "Hiển thị phần chứng thực",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "googleAnalyticsId",
      title: "Mã Google Analytics",
      type: "string",
      description: "ID theo dõi GA (ví dụ: G-XXXXXXXXXX)",
    }),
    defineField({
      name: "facebookPixelId",
      title: "Mã Facebook Pixel",
      type: "string",
    }),
    defineField({
      name: "twitterHandle",
      title: "Tên tài khoản Twitter",
      type: "string",
      description: "Tên tài khoản Twitter mà trang web sử dụng (không có @)",
    }),
    defineField({
      name: "footer",
      title: "Cài đặt chân trang",
      type: "object",
      fields: [
        {
          name: "text",
          title: "Nội dung chân trang",
          type: "text",
          rows: 2,
        },
        {
          name: "copyrightText",
          title: "Nội dung bản quyền",
          type: "string",
          description: "Ví dụ: '© 2025 Your Name. All rights reserved.'",
        },
        {
          name: "links",
          title: "Liên kết chân trang",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "title", type: "string", title: "Tiêu đề" },
                { name: "url", type: "string", title: "URL" },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: "maintenanceMode",
      title: "Chế độ bảo trì",
      type: "boolean",
      description: "Bật để hiển thị trang bảo trì",
      initialValue: false,
    }),
    defineField({
      name: "maintenanceMessage",
      title: "Nội dung thông báo bảo trì",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: "siteTitle",
      media: "siteLogo",
    },
  },
});
