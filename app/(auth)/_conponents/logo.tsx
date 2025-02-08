import Image from "next/image";
import {Poppins} from 'next/font/google';

import {cn} from '@/lib/utils';
import { Apple } from "lucide-react";

const font = Poppins({
    subsets: ['latin'],
    weight: ["200", "300", "400", "500", "600", "700", "800"],
})

const Logo = () => {
    return (
        <div className="flex flex-col items-center gap-y-4">
            <div className="bg-white rounded-full p-1">
                <Apple className="rounded-xl w-24 h-24 text-white bg-gradient-to-r from-blue-500 to-fuchsia-500 p-3"/>
                </div>            
                <div className={cn("flex flex-col items-center", font.className)}>
<p className="text-xl font-semibold text-zinc-700">Message Test</p>
                </div>
        </div>
    );
}
export default Logo;