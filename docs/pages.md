# 页面

此文件讲解此前端项目所需的页面和业务逻辑。

所有可选项的默认值，只是用于业务逻辑讲解和向用户展示。前端不处理可选项的默认值，没有用户输入的参数直接不携带。

计算名字和生成名字的组件几乎是可以复用的，表体一行和多行的区别，生成名字的响应内容只是在计算名字的响应内容外包了一层集合。

## 计算名字

### 输入

| 属性     | 类型                 | 可选       | 参数名         | 备注                               |
| -------- | -------------------- | ---------- | -------------- | ---------------------------------- |
| 父姓     | 汉字或数字（笔画数） |            | fuxing         |
| 母姓     | 汉字或数字（笔画数） |            | muxing         |
| 字       | 汉字或数字（笔画数） |            | zi             |
| 名       | 汉字或数字（笔画数） |            | ming           |
| 号       | 汉字或数字（笔画数） | 是，默认空 | hao            |
| 喜用五行 | 五行之间多选       | 是，默认空 | xiyong_wuxing  |
| 喜用阴阳 | 阴阳之间单选       | 是，默认空 | xiyong_yinyang | `喜用五行`有值时，才显示以供可选 |

### 输出

#### 表头（双层）

| 第一层   | 第二层         | 响应路径                   |
| -------- | -------------- | -------------------------- |
| 姓名部分 | 父姓           | RESPONSE.name_parts.fuxing |
| 姓名部分 | 母姓           | RESPONSE.name_parts.muxing |
| 姓名部分 | 字             | RESPONSE.name_parts.zi     |
| 姓名部分 | 名             | RESPONSE.name_parts.ming   |
| 姓名部分 | 号（有号时）   | RESPONSE.name_parts.hao    |
| 五格     | 天格           | RESPONSE.grids.tiange      |
| 五格     | 人格           | RESPONSE.grids.renge       |
| 五格     | 地格           | RESPONSE.grids.dige        |
| 五格     | 外格           | RESPONSE.grids.waige       |
| 五格     | 奇格（有号时） | RESPONSE.grids.qige        |
| 五格     | 总格           | RESPONSE.grids.zongge      |
| 五格     | 天格           | RESPONSE.sancai.tiange     |
| 五格     | 人格           | RESPONSE.sancai.renge      |
| 五格     | 地格           | RESPONSE.sancai.dige       |

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
