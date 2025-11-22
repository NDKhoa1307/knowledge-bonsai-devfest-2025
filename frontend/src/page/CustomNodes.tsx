// CustomNodes.tsx
import { memo } from 'react';
import { Handle, Position, type NodeProps } from 'reactflow';

// 1. The Pot (Foundation - Unchanged)
export const PotNode = memo(({ data }: NodeProps) => {
    return (
      <div className="relative flex flex-col items-center">
        <div className="w-24 h-20 bg-stone-700 rounded-b-3xl border-t-8 border-stone-800 shadow-xl flex items-center justify-center z-10">
          <span className="text-stone-300 text-xs font-bold uppercase tracking-widest">{data.label}</span>
        </div>
        <div className="absolute -top-2 w-20 h-4 bg-stone-900 rounded-full z-0" />
        {/* Grows Upwards */}
        <Handle type="source" position={Position.Top} id="top" className="!bg-transparent" />
      </div>
    );
  });
  
  // 2. The Trunk (The Router)
  export const TrunkNode = memo(({ data }: NodeProps) => {
    return (
      <div className="min-w-[120px] bg-[#5D4037] text-amber-50 px-4 py-3 rounded-sm border-l-4 border-r-4 border-[#3E2723] shadow-md flex flex-col items-center justify-center text-center relative">
        
        {/* 1. Vertical Connections (Main Stem) */}
        {/* Input from below */}
        <Handle type="target" position={Position.Bottom} id="bottom" className="!bg-[#3E2723]" />
        {/* Output to above */}
        <Handle type="source" position={Position.Top} id="top" className="!bg-[#3E2723]" />
  
        {/* 2. Horizontal Connections (Branches) */}
        {/* Output to Left Branch */}
        <Handle 
          type="source" 
          position={Position.Left} 
          id="left" 
          className="!bg-[#3E2723] !w-3 !h-3 -ml-1" 
        />
        {/* Output to Right Branch */}
        <Handle 
          type="source" 
          position={Position.Right} 
          id="right" 
          className="!bg-[#3E2723] !w-3 !h-3 -mr-1" 
        />
        
        <span className="font-serif font-bold tracking-wide">{data.label}</span>
        
        {/* 3. Incoming Horizontal (If a trunk is a side branch itself) */}
        <Handle type="target" position={Position.Left} id="target-left" className="!bg-transparent" />
        <Handle type="target" position={Position.Right} id="target-right" className="!bg-transparent" />
      </div>
    );
  });
  
  // 3. The Leaf (The End Point)
  export const LeafNode = memo(({ data }: NodeProps) => {
    return (
      <div className="group relative">
        {/* Input Handles - We add ALL directions so the leaf can be placed anywhere */}
        
        {/* If leaf is on the RIGHT of a tree, connect to its LEFT */}
        <Handle type="target" position={Position.Left} id="left" className="!bg-green-700 !w-2 !h-2" />
        
        {/* If leaf is on the LEFT of a tree, connect to its RIGHT */}
        <Handle type="target" position={Position.Right} id="right" className="!bg-green-700 !w-2 !h-2" />
        
        {/* Vertical backup */}
        <Handle type="target" position={Position.Bottom} id="bottom" className="!bg-green-700 !w-2 !h-2" />
  
        <div className="px-4 py-2 bg-green-500 text-white rounded-tr-2xl rounded-bl-2xl rounded-tl-md rounded-br-md shadow-sm border border-green-400 transition-transform hover:scale-110 hover:-rotate-2 cursor-pointer">
          <span className="text-sm font-medium">{data.label}</span>
        </div>
      </div>
    );
  });