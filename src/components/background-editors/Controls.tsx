import React from 'react';

interface SliderControlProps {
    label: string;
    value: number;
    min: string;
    max: string;
    step: string;
    onChange: (val: number) => void;
    decimals?: number;
}

export const SliderControl: React.FC<SliderControlProps> = ({
    label,
    value,
    min,
    max,
    step,
    onChange,
    decimals = 1,
}) => {
    const id = `slider-${label.replace(/\s+/g, '-').toLowerCase()}`;
    return (
        <div className="block mb-3 last:mb-0 group/slider">
            <label
                htmlFor={id}
                className="flex justify-between text-gray-400 group-hover/slider:text-[#915EFF] text-[10px] uppercase tracking-widest mb-1.5 font-bold transition-colors"
            >
                <span>{label}</span>
                <span className="text-[#915EFF] font-mono bg-[#915EFF]/10 px-1.5 rounded">
                    {value.toFixed(decimals)}
                </span>
            </label>
            <input
                id={id}
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#915EFF] hover:accent-[#a17fff] transition-all"
            />
        </div>
    );
};

interface ColorControlProps {
    label: string;
    value: string;
    onChange: (val: string) => void;
}

export const ColorControl: React.FC<ColorControlProps> = ({ label, value, onChange }) => {
    const id = `color-${label.replace(/\s+/g, '-').toLowerCase()}`;
    return (
        <div className="flex flex-col mb-3 group/color">
            <label
                htmlFor={id}
                className="text-gray-400 group-hover/color:text-[#915EFF] text-[10px] uppercase tracking-widest mb-1.5 font-bold transition-colors"
            >
                {label}
            </label>
            <div className="relative flex items-center bg-black/40 border border-white/10 rounded-lg p-1.5 hover:border-[#915EFF] transition-all group">
                <input
                    id={id}
                    type="color"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                <div
                    className="w-6 h-6 rounded-md shadow-inner border border-white/10 group-hover:scale-105 transition-transform"
                    style={{ backgroundColor: value }}
                />
                <span className="ml-2 text-[10px] text-gray-300 font-mono uppercase tracking-[0.2em]">
                    {value}
                </span>
            </div>
        </div>
    );
};
