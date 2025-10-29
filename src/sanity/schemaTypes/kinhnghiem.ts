import { defineField, defineType } from "sanity";

export default defineType({
  name: "experience",
  title: "Kinh nghiệm làm việc",
  type: "document",
  fields: [
    defineField({
      name: "company",
      title: "Tên công ty",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "position",
      title: "Vị trí / Vai trò",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "employmentType",
      title: "Hình thức làm việc",
      type: "string",
      options: {
        list: [
          { title: "Toàn thời gian", value: "full-time" },
          { title: "Bán thời gian", value: "part-time" },
          { title: "Hợp đồng", value: "contract" },
          { title: "Tự do", value: "freelance" },
          { title: "Học viên", value: "internship" },
        ],
      },
    }),
    defineField({
      name: "location",
      title: "Vị trí",
      type: "string",
      description: "Ví dụ: Thành phố, Bang hoặc 'Remote'",
    }),
    defineField({
      name: "startDate",
      title: "Ngày bắt đầu",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "endDate",
      title: "Ngày kết thúc",
      type: "date",
      description: "Để trống nếu là vị trí hiện tại",
    }),
    defineField({
      name: "current",
      title: "Vị trí hiện tại",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "description",
      title: "Mô tả",
      type: "array",
      of: [{ type: "block" }],
      description: "Chi tiết về trách nhiệm và thành tựu công việc",
    }),
    defineField({
      name: "responsibilities",
      title: "Trách nhiệm chính",
      type: "array",
      of: [{ type: "string" }],
      description: "Danh sách các trách nhiệm chính",
    }),
    defineField({
      name: "achievements",
      title: "Thành tựu nổi bật",
      type: "array",
      of: [{ type: "string" }],
      description: "Các thành tựu có thể đo lường được",
    }),
    defineField({
      name: "technologies",
      title: "Công nghệ sử dụng",
      type: "array",
      of: [{ type: "reference", to: [{ type: "skill" }] }],
    }),
    defineField({
      name: "companyLogo",
      title: "Logo công ty",
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
      name: "companyWebsite",
      title: "Website công ty",
      type: "url",
    }),
    defineField({
      name: "order",
      title: "Thứ tự hiển thị",
      type: "number",
      description:
        "Số nhỏ hơn sẽ xuất hiện trước (thường là công việc mới nhất)",
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: "position",
      subtitle: "company",
      media: "companyLogo",
      current: "current",
    },
    prepare(selection) {
      const { title, subtitle, media, current } = selection;
      return {
        title: current ? `${title} (Current)` : title,
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
      by: [{ field: "startDate", direction: "desc" }],
    },
  ],
});
