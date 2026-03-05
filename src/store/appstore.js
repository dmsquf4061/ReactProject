import { create } from "zustand"

export const useAppStore = create((set) => ({
  // 로더가 떠있는지(네비 show 제어 등)
  isLoading: true,

  // ✅ 인트로가 "끝났는지" (폰트 애니메이션 트리거용)
  introDone: false,

  // ✅ 인트로가 완전히 끝난 뒤 호출
  finishLoading: () =>
    set({
      isLoading: false,
      introDone: true,
    }),
}))