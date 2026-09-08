'use client';

import {
  DragDropContext,
  Draggable,
  Droppable,
  type DraggableProvidedDragHandleProps,
  type DropResult,
} from '@hello-pangea/dnd';
import type { PortfolioSection } from '@/lib/api-client';
import { isPinnedSectionType, SECTION_LABELS } from '@/lib/sections';
import { GripVertical } from 'lucide-react';
import { useMemo } from 'react';

function SectionRow({
  section,
  active,
  onSelect,
  dragHandleProps,
  isDragging,
}: {
  section: PortfolioSection;
  active: boolean;
  onSelect: (id: string) => void;
  dragHandleProps?: DraggableProvidedDragHandleProps | null;
  isDragging?: boolean;
}) {
  const pinned = isPinnedSectionType(section.type);

  return (
    <div
      className={`flex w-full items-center gap-1 rounded-xl px-2 py-2 text-sm ${
        active ? 'bg-ink text-foam' : 'text-muted'
      } ${isDragging ? 'shadow-lg ring-1 ring-signal/40' : ''}`}
    >
      {dragHandleProps ? (
        <button
          type="button"
          className="shrink-0 cursor-grab touch-none px-1 text-current/50 hover:text-current active:cursor-grabbing"
          aria-label={`Drag ${SECTION_LABELS[section.type]}`}
          {...dragHandleProps}
        >
          <GripVertical className="size-4" />
        </button>
      ) : (
        <span className="w-6 shrink-0" aria-hidden />
      )}
      <button
        type="button"
        className="min-w-0 flex-1 truncate text-left"
        onClick={() => onSelect(section.id)}
      >
        {SECTION_LABELS[section.type]}
        {!section.visible ? ' · hidden' : ''}
      </button>
      {pinned ? (
        <span className="shrink-0 pr-1 text-[10px] tracking-wide text-muted uppercase">
          pinned
        </span>
      ) : null}
    </div>
  );
}

export function SectionList({
  sections,
  activeId,
  onSelect,
  onReorder,
}: {
  sections: PortfolioSection[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onReorder: (next: PortfolioSection[]) => void;
}) {
  const sorted = useMemo(
    () => [...sections].sort((a, b) => a.order - b.order),
    [sections],
  );

  const headers = sorted.filter((s) => s.type === 'Header');
  const footers = sorted.filter((s) => s.type === 'Footer');
  const middle = sorted.filter((s) => !isPinnedSectionType(s.type));

  function onDragEnd(result: DropResult) {
    if (!result.destination) return;
    if (result.source.index === result.destination.index) return;

    const nextMiddle = [...middle];
    const [moved] = nextMiddle.splice(result.source.index, 1);
    nextMiddle.splice(result.destination.index, 0, moved);

    onReorder(
      [...headers, ...nextMiddle, ...footers].map((s, order) => ({
        ...s,
        order,
      })),
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {headers.map((section) => (
        <SectionRow
          key={section.id}
          section={section}
          active={activeId === section.id}
          onSelect={onSelect}
        />
      ))}

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="portfolio-sections">
          {(provided) => (
            <ul
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="flex flex-col gap-2"
            >
              {middle.map((section, index) => (
                <Draggable
                  key={section.id}
                  draggableId={section.id}
                  index={index}
                >
                  {(dragProvided, snapshot) => (
                    <li
                      ref={dragProvided.innerRef}
                      {...dragProvided.draggableProps}
                    >
                      <SectionRow
                        section={section}
                        active={activeId === section.id}
                        onSelect={onSelect}
                        dragHandleProps={dragProvided.dragHandleProps}
                        isDragging={snapshot.isDragging}
                      />
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>

      {footers.map((section) => (
        <SectionRow
          key={section.id}
          section={section}
          active={activeId === section.id}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
