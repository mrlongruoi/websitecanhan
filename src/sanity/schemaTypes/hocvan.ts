import { defineField, defineType } from "sanity";

export default defineType({
  name: "education",
  title: "Học vấn",
  type: "document",
  fields: [
    defineField({
      name: "institution",
      title: "Tên cơ sở giáo dục",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "degree",
      title: "Bằng cấp",
      type: "string",
      description: "Ví dụ: 'Cử nhân Khoa học', 'Thạc sĩ Khoa học Máy tính''",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "fieldOfStudy",
      title: "Ngành học",
      type: "string",
      description: "Ví dụ: 'Khoa học máy tính', 'Kỹ thuật phần mềm'",
    }),
    defineField({
      name: "startDate",
      title: "Ngày bắt đầu",
      type: "date",
    }),
    defineField({
      name: "endDate",
      title: "Ngày kết thúc",
      type: "date",
      description: "Để trống nếu đang theo học",
    }),
    defineField({
      name: "current",
      title: "Đang theo học",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "gpa",
      title: "GPA",
      type: "string",
      description: "Ví dụ: '3.8/4.0'",
    }),
    defineField({
      name: "description",
      title: "Mô tả",
      type: "text",
      rows: 4,
      description: "Các khóa học, thành tích hoặc hoạt động nổi bật",
    }),
    defineField({
      name: "achievements",
      title: "Thành tích & Học bổng",
      type: "array",
      of: [{ type: "string" }],
      description: "Danh sách của Trưởng khoa, Học bổng, Giải thưởng, v.v.",
    }),
    defineField({
      name: "logo",
      title: "Logo cơ sở giáo dục",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "website",
      title: "Website cơ sở giáo dục",
      type: "url",
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
      title: "degree",
      subtitle: "institution",
      media: "logo",
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
      by: [{ field: "endDate", direction: "desc" }],
    },
  ],
});