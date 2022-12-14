import { TTemplate } from "../../../../Types/Types";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Divider from "@mui/material/Divider";
import { useEffect, useRef, useState } from "react";
import TouchRipple from "@mui/material/ButtonBase/TouchRipple";

const Sidebar = ({
  templateList,
  selectedTemplate,
  setSelectedTemplate,
}: {
  templateList?: Array<TTemplate>;
  selectedTemplate?: TTemplate;
  setSelectedTemplate: (template?: TTemplate) => void;
}) => {
  const [search, setSearch] = useState("");
  const [filteredList, setFilteredList] = useState(templateList);

  useEffect(() => {
    setFilteredList(templateList);
  }, [templateList]);

  const onNewTemplate = () => {
    setSelectedTemplate({ title: "" });
  };

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.currentTarget.value;
    setSearch(searchValue);
    setFilteredList(() => {
      const list: Array<TTemplate> = [];
      templateList?.forEach((template: TTemplate) => {
        if (template.title?.includes(searchValue)) list.push(template);
      });
      return list;
    });
  };

  return (
    <aside className="flex w-[22%] flex-col  gap-2 h-full ">
      <div className="flex gap-2 px-2 w-full">
        <input
          onChange={onSearch}
          value={search}
          type="text"
          className="min-w-0 p-1 border rounded-lg "
          placeholder="Search template..."
        />
        <button
          className="border px-2 py-1 rounded-lg flex items-center hover:bg-gray-200 transition-all font-bold"
          onClick={onNewTemplate}
        >
          <AddOutlinedIcon fontSize="small" />
          New
        </button>
      </div>
      <Divider />
      <ul className="list-none text-md flex flex-col grow h-0 overflow-y-scroll dashboard-scrollbar px-2">
        {filteredList
          ?.sort((a: TTemplate, b: TTemplate) => {
            if (a?.title < b?.title) {
              return -1;
            }
            if (a?.title > b?.title) {
              return 1;
            }
            return 0;
          })
          ?.map((template: TTemplate) => (
            <TemplateListItem
              template={template}
              selectedTemplate={selectedTemplate}
              setSelectedTemplate={setSelectedTemplate}
              key={template.id}
            />
          ))}
      </ul>
    </aside>
  );
};

const TemplateListItem = ({
  template,
  selectedTemplate,
  setSelectedTemplate,
}: {
  template: TTemplate;
  selectedTemplate?: TTemplate;
  setSelectedTemplate: (template: TTemplate) => void;
}) => {
  const rippleRef = useRef<any>(null);

  return (
    <li
      className={`p-2 cursor-pointer hover:bg-slate-200 relative rounded-md ${
        template.id === selectedTemplate?.id && "bg-gray-200 hover:bg-gray-300"
      } transition-all`}
      onClick={() => {
        setSelectedTemplate(template);
      }}
      onMouseDown={(e) => rippleRef.current.start(e)}
      onMouseUp={(e) => rippleRef.current.stop(e)}
    >
      <TouchRipple ref={rippleRef} center={false} />

      {template.title}
    </li>
  );
};

export default Sidebar;
