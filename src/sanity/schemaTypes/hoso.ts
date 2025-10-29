import { defineField, defineType } from "sanity";

export default defineType({
  name: "profile",
  title: "Hồ sơ",
  type: "document",
  fields: [
    defineField({
      name: "firstName",
      title: "Họ",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "lastName",
      title: "Tên",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "headline",
      title: "Tiêu đề chuyên môn",
      type: "string",
      description: "E.g., 'Full-Stack Developer & AI Engineer'",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "headlineStaticText",
      title: "Nội dung cố định trong tiêu đề",
      type: "string",
      description: "Nội dung cố định trong tiêu đề (ví dụ: 'I build')",
      placeholder: "I build",
    }),
    defineField({
      name: "headlineAnimatedWords",
      title: "Các từ động trong tiêu đề",
      type: "array",
      description:
        "Các từ động trong tiêu đề (ví dụ: 'Full-Stack Developer & AI Engineer')",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.min(2).max(10),
    }),
    defineField({
      name: "headlineAnimationDuration",
      title: "Thời gian hoạt ảnh tiêu đề (ms)",
      type: "number",
      description: "Thời gian mỗi từ hiển thị trước khi lật (mặc định: 3000ms)",
      initialValue: 3000,
      validation: (Rule) => Rule.min(1000).max(10000),
    }),
    defineField({
      name: "shortBio",
      title: "Tiểu sử ngắn",
      type: "text",
      rows: 3,
      description: "Brief introduction (2-3 sentences)",
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      name: "fullBio",
      title: "Tiểu sử chi tiết",
      type: "array",
      of: [{ type: "block" }],
      description: "Tiểu sử chi tiết với định dạng văn bản",
    }),
    defineField({
      name: "profileImage",
      title: "Hình ảnh hồ sơ",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Mô tả hình ảnh",
          description: "Mô tả hình ảnh (hữu ích cho SEO và khả năng truy cập)",
        },
      ],
    }),
    defineField({
      name: "email",
      title: "E-mail",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "phone",
      title: "Số điện thoại",
      type: "string",
    }),
    defineField({
      name: "location",
      title: "Vị trí",
      type: "string",
      description: "Ví dụ: 'San Francisco, CA' hoặc 'Remote'",
    }),
    defineField({
      name: "availability",
      title: "Tình trạng sẵn có",
      type: "string",
      options: {
        list: [
          { title: "Có sẵn để thuê", value: "available" },
          { title: "Mở để cơ hội", value: "open" },
          { title: "Không tìm kiếm", value: "unavailable" },
        ],
      },
    }),
    defineField({
      name: "socialLinks",
      title: "Liên kết mạng xã hội",
      type: "object",
      fields: [
        { name: "github", title: "GitHub", type: "url" },
        { name: "linkedin", title: "LinkedIn", type: "url" },
        { name: "twitter", title: "Twitter/X", type: "url" },
        { name: "website", title: "Trang Web cá nhân", type: "url" },
        { name: "medium", title: "Medium", type: "url" },
        { name: "devto", title: "Dev.to", type: "url" },
        { name: "youtube", title: "YouTube", type: "url" },
        { name: "stackoverflow", title: "Stack Overflow", type: "url" },
      ],
    }),
    defineField({
      name: "yearsOfExperience",
      title: "Số năm kinh nghiệm",
      type: "number",
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "stats",
      title: "Thống kê hồ sơ",
      type: "array",
      description:
        "Các thống kê chính để hiển thị trong phần giới thiệu của bạn",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "label",
              title: "Nhãn",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "value",
              title: "Giá trị",
              type: "string",
              description: "Ví dụ: '50+', '100%', '24/7'",
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: "label",
              subtitle: "value",
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "firstName",
      subtitle: "headline",
      media: "profileImage",
    },
    prepare(selection) {
      const { title, subtitle, media } = selection;
      return {
        title: title,
        subtitle: subtitle,
        media: media,
      };
    },
  },
});
