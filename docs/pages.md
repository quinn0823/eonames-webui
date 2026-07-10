# 页面

此文件讲解此前端项目所需的页面和业务逻辑。

所有可选项的默认值，只是用于业务逻辑讲解和向用户展示。前端不处理可选项的默认值，没有用户输入的参数直接不携带。

计算名字和生成名字的组件几乎是可以复用的，表体一行和多行的区别，生成名字的响应内容只是在计算名字的响应内容外包了一层集合。

## 计算名字

### 输入

- 父姓（汉字）(fuxing)
- 母姓（汉字）(muxing)
- 字（汉字）(zi)
- 名（汉字）(ming)
- 号（汉字。可选，默认空）(hao)
- 关系组：
  - 喜用五行（五行之间多选。可选，默认空）(xiyong_wuxing)
  - 喜用阴阳（阴阳之间单选。`喜用五行`有值时，才显示以供选择。本身也可选，默认空）(xiyong_yinyang)

### 输出

#### 表头（双层）

- 姓名部分 (RESPONSE.name_parts.*)
  - 父姓 (fuxing)
  - 母姓 (muxing)
  - 字 (zi)
  - 名 (ming)
  - 号（有号时）(hao)
- 五格 (RESPONSE.grids.*)
  - 天格 (tiange)
  - 人格 (renge)
  - 地格 (dige)
  - 外格 (waige)
  - 奇格（有号时）(qige)
  - 总格 (zongge)
- 三才 (RESPONSE.sancai.*)
  - 天格 (tiange)
  - 人格 (renge)
  - 地格 (dige)

#### 表体

- 姓名部分的每列
  - 总笔画数 (`RESPONSE.name_parts.*.strokes`)
  - 如果 `RESPONSE.name_parts.*.characters` 有值，添加第二行。横向排列每字五行 (`RESPONSE.name_parts.*.characters[*].wuxing`)。根据 `RESPONSE.name_parts.*.characters[*].is_xiyong`，true 为绿色，false 为红色，标记每个五行的颜色。
- 五格的每列
  - 第一行
    - 数理数 (`RESPONSE.grids.*.stroke_sum`)
    - 吉凶 (`RESPONSE.grids.*.shuli.luck`)。`吉`和`大吉`为绿色，`凶`和`大凶`为红色。
  - 第二行
    - 数理五行 (`RESPONSE.grids.*.wuxing`)。根据 `RESPONSE.grids.*.is_xiyong`，true 为绿色，false 为红色。
    - 数理阴阳 (`RESPONSE.grids.*.yinyang`)。根据 `RESPONSE.grids.*.is_xiyong_yinyang`，true 为绿色，false 为红色。
- 三才的每列
  - 第一行：三才吉凶 (`RESPONSE.sancai.*`)。`吉`为绿色，`凶`为红色。可能没有吉凶值。
  - 第二行
    - 数理五行 (`RESPONSE.grids.*.wuxing`)。不标记特殊颜色。
    - 数理阴阳 (`RESPONSE.grids.*.yinyang`)。不标记特殊颜色。

## 生成名字

### 输入

- 父姓（汉字）
- 母姓（汉字）
- 喜用五行（五行之间多选。必选）
- 喜用阴阳（阴阳之间单选。必选）
- 字（汉字或数字（生成字数）。可选，默认 1）
- 名（汉字或数字（生成字数）。可选，默认 1）
- 号（汉字或数字（生成字数）。可选，默认 0）
- 是否为女性（布尔值勾选。可选，默认 false）
- 单字最大笔画数限制（数字，1-30。可选，默认 30）
