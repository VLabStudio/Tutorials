using System;

namespace MathLibrary
{
    public class Math
    {
        [DllExport]
        public static int Subtract(int num1, int num2)
        {
            return num1 - num2;
        }

        [DllExport]
        public static int Add(int num1, int num2)
        {
            return num1 + num2;
        }

        [DllExport]
        public static int Random(int min, int max)
        {
            Random random = new Random();
            return random.Next(min, max);
        }
    }
}
