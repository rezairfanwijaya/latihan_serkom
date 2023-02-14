import { Sidebar } from "flowbite-react";


const MySidebar = () => {
    return (<>
        <div className="-mt-9">
            <div className="w-fit border h-screen">
                <Sidebar aria-label="Default sidebar example">
                    <Sidebar.Items>
                        <Sidebar.ItemGroup>
                            <Sidebar.Item
                                href="/admin/wisata/statistik"
                            >
                                Statistik
                            </Sidebar.Item>
                            <Sidebar.Item
                                href="/admin/kelola-wisata"
                            >
                                Kelola Wisata
                            </Sidebar.Item>
                            <Sidebar.Item
                                href="/admin/wisata"
                            >
                                Daftar Wisata
                            </Sidebar.Item>
                        </Sidebar.ItemGroup>
                    </Sidebar.Items>
                </Sidebar>
            </div>
        </div>
    </>);
}

export default MySidebar;