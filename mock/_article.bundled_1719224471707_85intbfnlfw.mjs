// mock/article.ts
var article_list = [];
var count = 100;
for (let i = 0; i < count; i++) {
  article_list.push({
    id: i,
    timestamp: (/* @__PURE__ */ new Date()).getTime(),
    author: `Author ${i}`,
    reviewer: `reviewer ${i}`,
    title: `Title ${i}`,
    importance: Math.floor(Math.random() * 3) + 1,
    type: ["CN", "US", "JP", "EU"][Math.floor(Math.random() * 4)],
    status: ["published", "draft"][Math.floor(Math.random() * 2)],
    display_time: (/* @__PURE__ */ new Date()).toISOString(),
    pageviews: Math.floor(Math.random() * (5e3 - 300)) + 300,
    remark: `remark ${i}`
  });
}
var article_default = [
  {
    url: "/api/v1/article/list",
    timeout: 200,
    method: "get",
    response: ({ query }) => {
      const { importance, type, title, page = 1, limit = 10, sort } = query;
      let mock_list = article_list.filter((item) => {
        if (importance && item.importance !== +importance) return false;
        if (type && item.type !== type) return false;
        if (title && item.title.indexOf(title) < 0) return false;
        if (item.status === "deleted") return false;
        return true;
      });
      if (sort === "-id") {
        mock_list = mock_list.reverse();
      }
      const page_list = mock_list.filter(
        (item, index) => index < limit * page && index >= limit * (page - 1)
      );
      return {
        code: "00000",
        data: { total: mock_list.length, page, items: page_list },
        msg: "\u4E00\u5207ok"
      };
    }
  },
  {
    url: "/api/v1/article/detail",
    timeout: 200,
    method: "get",
    response: ({ query }) => {
      const { id } = query;
      for (const article of article_list) {
        if (article.id === +id) {
          return {
            code: "00000",
            data: article,
            msg: "\u4E00\u5207ok"
          };
        }
      }
    }
  },
  {
    url: "/api/v1/article/pv",
    timeout: 200,
    method: "get",
    response: ({ query }) => {
      const { id } = query;
      for (const article of article_list) {
        if (article.id === +id) {
          return {
            code: "00000",
            data: {
              pv: article.pageviews,
              pvData: [
                { key: "PC", pv: 1024 },
                { key: "mobile", pv: 1024 },
                { key: "ios", pv: 1024 },
                { key: "android", pv: 1024 }
              ]
            },
            msg: "\u4E00\u5207ok"
          };
        }
      }
    }
  },
  {
    url: "/api/v1/article/update",
    timeout: 200,
    method: "post",
    response: ({ body }) => {
      const { id, ...updatedFields } = body;
      const articleToUpdate = article_list.find(
        (article) => article.id === id
      );
      if (articleToUpdate) {
        Object.assign(articleToUpdate, updatedFields);
        return {
          code: "00000",
          data: {
            article: articleToUpdate
          },
          msg: "\u4E00\u5207ok"
        };
      } else {
        console.error(`Article with id ${id} not found.`);
      }
    }
  },
  {
    url: "/api/v1/article/create",
    timeout: 200,
    method: "post",
    response: ({ body }) => {
      const { title, author, importance, type, status, remark, timestamp } = body;
      const maxId = article_list.reduce((maxId2, article2) => {
        return Math.max(maxId2, article2.id);
      }, -1);
      const article = {
        id: maxId + 1,
        timestamp,
        author,
        reviewer: `reviewer ${maxId + 1}`,
        title,
        importance,
        type,
        status,
        display_time: new Date(timestamp).toISOString(),
        pageviews: Math.floor(Math.random() * (5e3 - 300)) + 300,
        remark
      };
      article_list.push(article);
      return {
        code: "00000",
        data: {
          article
        },
        msg: "\u4E00\u5207ok"
      };
    }
  },
  {
    url: "/api/v1/article/delete",
    timeout: 200,
    method: "post",
    response: ({ body }) => {
      const { id } = body;
      const index = article_list.findIndex((article) => article.id === id);
      article_list.splice(index, 1);
      return {
        code: "00000",
        msg: "\u4E00\u5207ok"
      };
    }
  }
];
export {
  article_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibW9jay9hcnRpY2xlLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX2luamVjdGVkX2ZpbGVuYW1lX18gPSBcIkY6XFxcXFR1ZHdcXFxcV2ViXFxcXGhodV9pb3RfYXBwXFxcXG1vY2tcXFxcYXJ0aWNsZS50c1wiO2NvbnN0IF9faW5qZWN0ZWRfZGlybmFtZV9fID0gXCJGOlxcXFxUdWR3XFxcXFdlYlxcXFxoaHVfaW90X2FwcFxcXFxtb2NrXCI7Y29uc3QgX19pbmplY3RlZF9pbXBvcnRfbWV0YV91cmxfXyA9IFwiZmlsZTovLy9GOi9UdWR3L1dlYi9oaHVfaW90X2FwcC9tb2NrL2FydGljbGUudHNcIjtpbXBvcnQgeyBNb2NrTWV0aG9kIH0gZnJvbSBcInZpdGUtcGx1Z2luLW1vY2tcIjtcclxuXHJcbmNvbnN0IGFydGljbGVfbGlzdDogYW55ID0gW107XHJcbmNvbnN0IGNvdW50ID0gMTAwO1xyXG5cclxuZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XHJcbiAgYXJ0aWNsZV9saXN0LnB1c2goe1xyXG4gICAgaWQ6IGksXHJcbiAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKCkuZ2V0VGltZSgpLFxyXG4gICAgYXV0aG9yOiBgQXV0aG9yICR7aX1gLFxyXG4gICAgcmV2aWV3ZXI6IGByZXZpZXdlciAke2l9YCxcclxuICAgIHRpdGxlOiBgVGl0bGUgJHtpfWAsXHJcbiAgICBpbXBvcnRhbmNlOiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAzKSArIDEsXHJcbiAgICB0eXBlOiBbXCJDTlwiLCBcIlVTXCIsIFwiSlBcIiwgXCJFVVwiXVtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA0KV0sXHJcbiAgICBzdGF0dXM6IFtcInB1Ymxpc2hlZFwiLCBcImRyYWZ0XCJdW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIpXSxcclxuICAgIGRpc3BsYXlfdGltZTogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxyXG4gICAgcGFnZXZpZXdzOiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoNTAwMCAtIDMwMCkpICsgMzAwLFxyXG4gICAgcmVtYXJrOiBgcmVtYXJrICR7aX1gLFxyXG4gIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBbXHJcbiAge1xyXG4gICAgdXJsOiBcIi9hcGkvdjEvYXJ0aWNsZS9saXN0XCIsXHJcbiAgICB0aW1lb3V0OiAyMDAsXHJcbiAgICBtZXRob2Q6IFwiZ2V0XCIsXHJcbiAgICByZXNwb25zZTogKHsgcXVlcnkgfSkgPT4ge1xyXG4gICAgICBjb25zdCB7IGltcG9ydGFuY2UsIHR5cGUsIHRpdGxlLCBwYWdlID0gMSwgbGltaXQgPSAxMCwgc29ydCB9ID0gcXVlcnk7XHJcbiAgICAgIGxldCBtb2NrX2xpc3QgPSBhcnRpY2xlX2xpc3QuZmlsdGVyKChpdGVtOiBhbnkpID0+IHtcclxuICAgICAgICBpZiAoaW1wb3J0YW5jZSAmJiBpdGVtLmltcG9ydGFuY2UgIT09ICtpbXBvcnRhbmNlKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgaWYgKHR5cGUgJiYgaXRlbS50eXBlICE9PSB0eXBlKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgaWYgKHRpdGxlICYmIGl0ZW0udGl0bGUuaW5kZXhPZih0aXRsZSkgPCAwKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgaWYgKGl0ZW0uc3RhdHVzID09PSBcImRlbGV0ZWRcIikgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9KTtcclxuICAgICAgaWYgKHNvcnQgPT09IFwiLWlkXCIpIHtcclxuICAgICAgICBtb2NrX2xpc3QgPSBtb2NrX2xpc3QucmV2ZXJzZSgpO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IHBhZ2VfbGlzdCA9IG1vY2tfbGlzdC5maWx0ZXIoXHJcbiAgICAgICAgKGl0ZW06IGFueSwgaW5kZXg6IG51bWJlcikgPT5cclxuICAgICAgICAgIGluZGV4IDwgbGltaXQgKiBwYWdlICYmIGluZGV4ID49IGxpbWl0ICogKHBhZ2UgLSAxKVxyXG4gICAgICApO1xyXG5cclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBjb2RlOiBcIjAwMDAwXCIsXHJcbiAgICAgICAgZGF0YTogeyB0b3RhbDogbW9ja19saXN0Lmxlbmd0aCwgcGFnZTogcGFnZSwgaXRlbXM6IHBhZ2VfbGlzdCB9LFxyXG4gICAgICAgIG1zZzogXCJcdTRFMDBcdTUyMDdva1wiLFxyXG4gICAgICB9O1xyXG4gICAgfSxcclxuICB9LFxyXG4gIHtcclxuICAgIHVybDogXCIvYXBpL3YxL2FydGljbGUvZGV0YWlsXCIsXHJcbiAgICB0aW1lb3V0OiAyMDAsXHJcbiAgICBtZXRob2Q6IFwiZ2V0XCIsXHJcbiAgICByZXNwb25zZTogKHsgcXVlcnkgfSkgPT4ge1xyXG4gICAgICBjb25zdCB7IGlkIH0gPSBxdWVyeTtcclxuICAgICAgZm9yIChjb25zdCBhcnRpY2xlIG9mIGFydGljbGVfbGlzdCkge1xyXG4gICAgICAgIGlmIChhcnRpY2xlLmlkID09PSAraWQpIHtcclxuICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGNvZGU6IFwiMDAwMDBcIixcclxuICAgICAgICAgICAgZGF0YTogYXJ0aWNsZSxcclxuICAgICAgICAgICAgbXNnOiBcIlx1NEUwMFx1NTIwN29rXCIsXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICB9LFxyXG4gIHtcclxuICAgIHVybDogXCIvYXBpL3YxL2FydGljbGUvcHZcIixcclxuICAgIHRpbWVvdXQ6IDIwMCxcclxuICAgIG1ldGhvZDogXCJnZXRcIixcclxuICAgIHJlc3BvbnNlOiAoeyBxdWVyeSB9KSA9PiB7XHJcbiAgICAgIGNvbnN0IHsgaWQgfSA9IHF1ZXJ5O1xyXG4gICAgICBmb3IgKGNvbnN0IGFydGljbGUgb2YgYXJ0aWNsZV9saXN0KSB7XHJcbiAgICAgICAgaWYgKGFydGljbGUuaWQgPT09ICtpZCkge1xyXG4gICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgY29kZTogXCIwMDAwMFwiLFxyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgcHY6IGFydGljbGUucGFnZXZpZXdzLFxyXG4gICAgICAgICAgICAgIHB2RGF0YTogW1xyXG4gICAgICAgICAgICAgICAgeyBrZXk6IFwiUENcIiwgcHY6IDEwMjQgfSxcclxuICAgICAgICAgICAgICAgIHsga2V5OiBcIm1vYmlsZVwiLCBwdjogMTAyNCB9LFxyXG4gICAgICAgICAgICAgICAgeyBrZXk6IFwiaW9zXCIsIHB2OiAxMDI0IH0sXHJcbiAgICAgICAgICAgICAgICB7IGtleTogXCJhbmRyb2lkXCIsIHB2OiAxMDI0IH0sXHJcbiAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbXNnOiBcIlx1NEUwMFx1NTIwN29rXCIsXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICB9LFxyXG4gIHtcclxuICAgIHVybDogXCIvYXBpL3YxL2FydGljbGUvdXBkYXRlXCIsXHJcbiAgICB0aW1lb3V0OiAyMDAsXHJcbiAgICBtZXRob2Q6IFwicG9zdFwiLFxyXG4gICAgcmVzcG9uc2U6ICh7IGJvZHkgfSkgPT4ge1xyXG4gICAgICBjb25zdCB7IGlkLCAuLi51cGRhdGVkRmllbGRzIH0gPSBib2R5O1xyXG4gICAgICAvLyBcdTY3RTVcdTYyN0VcdTg5ODFcdTY2RjRcdTY1QjBcdTc2ODRcdTY1ODdcdTdBRTBcclxuICAgICAgY29uc3QgYXJ0aWNsZVRvVXBkYXRlID0gYXJ0aWNsZV9saXN0LmZpbmQoXHJcbiAgICAgICAgKGFydGljbGU6IGFueSkgPT4gYXJ0aWNsZS5pZCA9PT0gaWRcclxuICAgICAgKTtcclxuXHJcbiAgICAgIC8vIFx1NTk4Mlx1Njc5Q1x1NjI3RVx1NTIzMFx1NEU4Nlx1ODk4MVx1NjZGNFx1NjVCMFx1NzY4NFx1NjU4N1x1N0FFMFxyXG4gICAgICBpZiAoYXJ0aWNsZVRvVXBkYXRlKSB7XHJcbiAgICAgICAgLy8gXHU0RjdGXHU3NTI4IE9iamVjdC5hc3NpZ24gXHU2NUI5XHU2Q0Q1XHU2NkY0XHU2NUIwXHU2NTg3XHU3QUUwXHJcbiAgICAgICAgT2JqZWN0LmFzc2lnbihhcnRpY2xlVG9VcGRhdGUsIHVwZGF0ZWRGaWVsZHMpO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICBjb2RlOiBcIjAwMDAwXCIsXHJcbiAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIGFydGljbGU6IGFydGljbGVUb1VwZGF0ZSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBtc2c6IFwiXHU0RTAwXHU1MjA3b2tcIixcclxuICAgICAgICB9O1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYEFydGljbGUgd2l0aCBpZCAke2lkfSBub3QgZm91bmQuYCk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgfSxcclxuICB7XHJcbiAgICB1cmw6IFwiL2FwaS92MS9hcnRpY2xlL2NyZWF0ZVwiLFxyXG4gICAgdGltZW91dDogMjAwLFxyXG4gICAgbWV0aG9kOiBcInBvc3RcIixcclxuICAgIHJlc3BvbnNlOiAoeyBib2R5IH0pID0+IHtcclxuICAgICAgY29uc3QgeyB0aXRsZSwgYXV0aG9yLCBpbXBvcnRhbmNlLCB0eXBlLCBzdGF0dXMsIHJlbWFyaywgdGltZXN0YW1wIH0gPVxyXG4gICAgICAgIGJvZHk7XHJcbiAgICAgIC8vIGFydGljbGVfbGlzdFx1NjcwMFx1NTkyN1x1NzY4NGlkXHU1MDNDO1xyXG4gICAgICBjb25zdCBtYXhJZCA9IGFydGljbGVfbGlzdC5yZWR1Y2UoKG1heElkOiBudW1iZXIsIGFydGljbGU6IGFueSkgPT4ge1xyXG4gICAgICAgIHJldHVybiBNYXRoLm1heChtYXhJZCwgYXJ0aWNsZS5pZCk7XHJcbiAgICAgIH0sIC0xKTtcclxuICAgICAgY29uc3QgYXJ0aWNsZSA9IHtcclxuICAgICAgICBpZDogbWF4SWQgKyAxLFxyXG4gICAgICAgIHRpbWVzdGFtcCxcclxuICAgICAgICBhdXRob3IsXHJcbiAgICAgICAgcmV2aWV3ZXI6IGByZXZpZXdlciAke21heElkICsgMX1gLFxyXG4gICAgICAgIHRpdGxlLFxyXG4gICAgICAgIGltcG9ydGFuY2UsXHJcbiAgICAgICAgdHlwZSxcclxuICAgICAgICBzdGF0dXMsXHJcbiAgICAgICAgZGlzcGxheV90aW1lOiBuZXcgRGF0ZSh0aW1lc3RhbXApLnRvSVNPU3RyaW5nKCksXHJcbiAgICAgICAgcGFnZXZpZXdzOiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoNTAwMCAtIDMwMCkpICsgMzAwLFxyXG4gICAgICAgIHJlbWFyayxcclxuICAgICAgfTtcclxuICAgICAgYXJ0aWNsZV9saXN0LnB1c2goYXJ0aWNsZSk7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgY29kZTogXCIwMDAwMFwiLFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgIGFydGljbGUsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBtc2c6IFwiXHU0RTAwXHU1MjA3b2tcIixcclxuICAgICAgfTtcclxuICAgIH0sXHJcbiAgfSxcclxuICB7XHJcbiAgICB1cmw6IFwiL2FwaS92MS9hcnRpY2xlL2RlbGV0ZVwiLFxyXG4gICAgdGltZW91dDogMjAwLFxyXG4gICAgbWV0aG9kOiBcInBvc3RcIixcclxuICAgIHJlc3BvbnNlOiAoeyBib2R5IH0pID0+IHtcclxuICAgICAgY29uc3QgeyBpZCB9ID0gYm9keTtcclxuICAgICAgY29uc3QgaW5kZXggPSBhcnRpY2xlX2xpc3QuZmluZEluZGV4KChhcnRpY2xlOiBhbnkpID0+IGFydGljbGUuaWQgPT09IGlkKTtcclxuICAgICAgYXJ0aWNsZV9saXN0LnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgY29kZTogXCIwMDAwMFwiLFxyXG4gICAgICAgIG1zZzogXCJcdTRFMDBcdTUyMDdva1wiLFxyXG4gICAgICB9O1xyXG4gICAgfSxcclxuICB9LFxyXG5dIGFzIE1vY2tNZXRob2RbXTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUVBLElBQU0sZUFBb0IsQ0FBQztBQUMzQixJQUFNLFFBQVE7QUFFZCxTQUFTLElBQUksR0FBRyxJQUFJLE9BQU8sS0FBSztBQUM5QixlQUFhLEtBQUs7QUFBQSxJQUNoQixJQUFJO0FBQUEsSUFDSixZQUFXLG9CQUFJLEtBQUssR0FBRSxRQUFRO0FBQUEsSUFDOUIsUUFBUSxVQUFVLENBQUM7QUFBQSxJQUNuQixVQUFVLFlBQVksQ0FBQztBQUFBLElBQ3ZCLE9BQU8sU0FBUyxDQUFDO0FBQUEsSUFDakIsWUFBWSxLQUFLLE1BQU0sS0FBSyxPQUFPLElBQUksQ0FBQyxJQUFJO0FBQUEsSUFDNUMsTUFBTSxDQUFDLE1BQU0sTUFBTSxNQUFNLElBQUksRUFBRSxLQUFLLE1BQU0sS0FBSyxPQUFPLElBQUksQ0FBQyxDQUFDO0FBQUEsSUFDNUQsUUFBUSxDQUFDLGFBQWEsT0FBTyxFQUFFLEtBQUssTUFBTSxLQUFLLE9BQU8sSUFBSSxDQUFDLENBQUM7QUFBQSxJQUM1RCxlQUFjLG9CQUFJLEtBQUssR0FBRSxZQUFZO0FBQUEsSUFDckMsV0FBVyxLQUFLLE1BQU0sS0FBSyxPQUFPLEtBQUssTUFBTyxJQUFJLElBQUk7QUFBQSxJQUN0RCxRQUFRLFVBQVUsQ0FBQztBQUFBLEVBQ3JCLENBQUM7QUFDSDtBQUVBLElBQU8sa0JBQVE7QUFBQSxFQUNiO0FBQUEsSUFDRSxLQUFLO0FBQUEsSUFDTCxTQUFTO0FBQUEsSUFDVCxRQUFRO0FBQUEsSUFDUixVQUFVLENBQUMsRUFBRSxNQUFNLE1BQU07QUFDdkIsWUFBTSxFQUFFLFlBQVksTUFBTSxPQUFPLE9BQU8sR0FBRyxRQUFRLElBQUksS0FBSyxJQUFJO0FBQ2hFLFVBQUksWUFBWSxhQUFhLE9BQU8sQ0FBQyxTQUFjO0FBQ2pELFlBQUksY0FBYyxLQUFLLGVBQWUsQ0FBQyxXQUFZLFFBQU87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
