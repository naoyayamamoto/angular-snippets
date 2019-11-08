import { adjuster } from "./adjuster";

describe("adjuster", () => {
    it("1つ置換", () => {
        expect(adjuster("{{ ${variable} | uppercase }}$0")).toBe(
            "{{ ${1:variable} | uppercase }}$0"
        );
    });

    it("同値複数置換", () => {
        expect(
            adjuster(
                "{{ ${variable} | uppercase }}{{ ${variable} | uppercase }}$0"
            )
        ).toBe(
            "{{ ${1:variable} | uppercase }}{{ ${1:variable} | uppercase }}$0"
        );
    });

    it("すでに数字パターン適応済み", () => {
        expect(adjuster("{{ ${1:variable} | uppercase }}$0")).toBe(
            "{{ ${1:variable} | uppercase }}$0"
        );
    });

    it("複数置換", () => {
        expect(
            adjuster("{{ ${v1} | uppercase }}{{ ${v2} | uppercase }}$0")
        ).toBe("{{ ${1:v1} | uppercase }}{{ ${2:v2} | uppercase }}$0");
    });

    it("複数同値挟み置換", () => {
        expect(
            adjuster(
                "{{ ${v1} | uppercase }}{{ ${v2} | uppercase }}{{ ${v1} | uppercase }}$0"
            )
        ).toBe(
            "{{ ${1:v1} | uppercase }}{{ ${2:v2} | uppercase }}{{ ${1:v1} | uppercase }}$0"
        );
    });

    it("すでに$1が使用されている", () => {
        expect(
            adjuster(
                "<mat-list>\n\t<mat-list-item>${item}</mat-list-item>$1\n</mat-list>$0"
            )
        ).toBe(
            "<mat-list>\n\t<mat-list-item>${1:item}</mat-list-item>$2\n</mat-list>$0"
        );
    });
    it("すでに$1が使用されている、変数2つ", () => {
        expect(
            adjuster(
                '<mat-list>\n\t<mat-list-item *ngFor="let ${item} of ${items}">{{ ${item} }}</mat-list-item>$1\n</mat-list>$0'
            )
        ).toBe(
            '<mat-list>\n\t<mat-list-item *ngFor="let ${1:item} of ${2:items}">{{ ${1:item} }}</mat-list-item>$3\n</mat-list>$0'
        );
    });
    it("選択式の変換", () => {
        expect(
            adjuster(
                '<div fxLayout="row" fxLayoutAlign="${1|start,center,end,space-around,space-between|} ${2:|start,center,end,stretch|}" fxLayoutGap="${gap}px">\n\t$0\n</div>'
            )
        ).toBe(
            '<div fxLayout="row" fxLayoutAlign="${1:start,center,end,space-around,space-between} ${2:start,center,end,stretch}" fxLayoutGap="${3:gap}px">\n\t$0\n</div>'
        );
    });
});
