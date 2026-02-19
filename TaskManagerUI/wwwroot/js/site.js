const gw = (window.__gatewayBaseUrl || 'http://localhost:5207/').replace(/\/+$/, '')

document.getElementById('gw').textContent = gw

async function api(path, opts = {}) {
    const url = gw + path
    const res = await fetch(url, {
        headers: { 'Content-Type': 'application/json', ...(opts.headers || {}) },
        ...opts,
    })
    const text = await res.text()
    let json
    try { json = text ? JSON.parse(text) : null } catch { json = text }
    if (!res.ok) {
        const msg = (json && json.title) ? `${json.title}` : (typeof json === 'string' ? json : JSON.stringify(json))
        throw new Error(`${res.status} ${res.statusText}: ${msg}`)
    }
    return json
}

function pretty(x) {
    return JSON.stringify(x, null, 2)
}

async function reloadUsers() {
    const out = document.getElementById('uOut')
    out.textContent = 'Loading...'
    try {
        const users = await api('/users/api/users')
        out.textContent = pretty(users)
        fillUsers(users)
    } catch (e) { out.textContent = String(e) }
}

async function reloadProjects() {
    const out = document.getElementById('pOut')
    out.textContent = 'Loading...'
    try {
        const projects = await api('/projects/api/projects')
        out.textContent = pretty(projects)
        fillProjects(projects)
    } catch (e) { out.textContent = String(e) }
}

async function reloadTasks() {
    const out = document.getElementById('tOut')
    out.textContent = 'Loading...'
    try {
        const tasks = await api('/tasks/api/tasks')
        out.textContent = pretty(tasks)
    } catch (e) { out.textContent = String(e) }
}

function fillUsers(users) {
    const selects = [document.getElementById('pOwner'), document.getElementById('tAssignee')]
    for (const s of selects) {
        const prev = s.value
        s.innerHTML = ''
        for (const u of users || []) {
            const opt = document.createElement('option')
            opt.value = u.id
            opt.textContent = `${u.userName} (${u.email})`;
            s.appendChild(opt)
        }
        if (prev) s.value = prev
    }
}

function fillProjects(projects) {
    const s = document.getElementById('tProject')
    const prev = s.value
    s.innerHTML = ''
    for (const p of projects || []) {
        const opt = document.createElement('option')
        opt.value = p.id
        opt.textContent = `${p.name}`;
        s.appendChild(opt)
    }
    if (prev) s.value = prev
}

// Users

document.getElementById('uCreate').onclick = async () => {
    const out = document.getElementById('uOut')
    try {
        const body = {
            userName: document.getElementById('uUserName').value,
            email: document.getElementById('uEmail').value,
            password: document.getElementById('uPassword').value,
        }
        const created = await api('/users/api/users', { method: 'POST', body: JSON.stringify(body) })
        out.textContent = pretty(created)
        await reloadUsers()
    } catch (e) { out.textContent = String(e) }
}

document.getElementById('uUpdate').onclick = async () => {
    const out = document.getElementById('uOut')
    try {
        const id = document.getElementById('uId').value.trim()
        const body = {
            userName: document.getElementById('uUserName').value,
            email: document.getElementById('uEmail').value,
            password: document.getElementById('uPassword').value || null,
        }
        const updated = await api(`/users/api/users/${id}`, { method: 'PUT', body: JSON.stringify(body) })
        out.textContent = pretty(updated)
        await reloadUsers()
    } catch (e) { out.textContent = String(e) }
}

document.getElementById('uDelete').onclick = async () => {
    const out = document.getElementById('uOut')
    try {
        const id = document.getElementById('uId').value.trim()
        await api(`/users/api/users/${id}`, { method: 'DELETE' })
        out.textContent = 'Deleted'
        await reloadUsers()
    } catch (e) { out.textContent = String(e) }
}

document.getElementById('uReload').onclick = reloadUsers

// Projects

document.getElementById('pCreate').onclick = async () => {
    const out = document.getElementById('pOut')
    try {
        const body = {
            name: document.getElementById('pName').value,
            description: document.getElementById('pDescription').value || null,
            ownerId: document.getElementById('pOwner').value,
        }
        const created = await api('/projects/api/projects', { method: 'POST', body: JSON.stringify(body) })
        out.textContent = pretty(created)
        await reloadProjects()
    } catch (e) { out.textContent = String(e) }
}

document.getElementById('pUpdate').onclick = async () => {
    const out = document.getElementById('pOut')
    try {
        const id = document.getElementById('pId').value.trim()
        const body = {
            name: document.getElementById('pName').value,
            description: document.getElementById('pDescription').value || null,
            ownerId: document.getElementById('pOwner').value,
        }
        const updated = await api(`/projects/api/projects/${id}`, { method: 'PUT', body: JSON.stringify(body) })
        out.textContent = pretty(updated)
        await reloadProjects()
    } catch (e) { out.textContent = String(e) }
}

document.getElementById('pDelete').onclick = async () => {
    const out = document.getElementById('pOut')
    try {
        const id = document.getElementById('pId').value.trim()
        await api(`/projects/api/projects/${id}`, { method: 'DELETE' })
        out.textContent = 'Deleted'
        await reloadProjects()
    } catch (e) { out.textContent = String(e) }
}

document.getElementById('pReload').onclick = reloadProjects

// Tasks

document.getElementById('tCreate').onclick = async () => {
    const out = document.getElementById('tOut')
    try {
        const due = document.getElementById('tDue').value.trim()
        const body = {
            title: document.getElementById('tTitle').value,
            description: document.getElementById('tDescription').value || null,
            projectId: document.getElementById('tProject').value,
            assigneeId: document.getElementById('tAssignee').value,
            dueDate: due ? new Date(due).toISOString() : null,
        }
        const created = await api('/tasks/api/tasks', { method: 'POST', body: JSON.stringify(body) })
        out.textContent = pretty(created)
        await reloadTasks()
    } catch (e) { out.textContent = String(e) }
}

document.getElementById('tUpdate').onclick = async () => {
    const out = document.getElementById('tOut')
    try {
        const id = document.getElementById('tId').value.trim()
        const due = document.getElementById('tDue').value.trim()
        const body = {
            title: document.getElementById('tTitle').value,
            description: document.getElementById('tDescription').value || null,
            projectId: document.getElementById('tProject').value,
            assigneeId: document.getElementById('tAssignee').value,
            dueDate: due ? new Date(due).toISOString() : null,
        }
        const updated = await api(`/tasks/api/tasks/${id}`, { method: 'PUT', body: JSON.stringify(body) })
        out.textContent = pretty(updated)
        await reloadTasks()
    } catch (e) { out.textContent = String(e) }
}

document.getElementById('tUpdateStatus').onclick = async () => {
    const out = document.getElementById('tOut')
    try {
        const id = document.getElementById('tId').value.trim()
        const status = document.getElementById('tStatus').value
        await api(`/tasks/api/tasks/${id}/status`, { method: 'PUT', body: JSON.stringify(status) })
        out.textContent = 'Status updated'
        await reloadTasks()
    } catch (e) { out.textContent = String(e) }
}

document.getElementById('tDelete').onclick = async () => {
    const out = document.getElementById('tOut')
    try {
        const id = document.getElementById('tId').value.trim()
        await api(`/tasks/api/tasks/${id}`, { method: 'DELETE' })
        out.textContent = 'Deleted'
        await reloadTasks()
    } catch (e) { out.textContent = String(e) }
}

document.getElementById('tReload').onclick = reloadTasks

// Diagnostics

document.getElementById('health').onclick = async () => {
    const out = document.getElementById('diag')
    out.textContent = 'Checking...'
    try {
        const users = await api('/users/api/users')
        out.textContent = 'Gateway OK. Users: ' + (Array.isArray(users) ? users.length : 'n/a')
    } catch (e) {
        out.textContent = String(e)
    }
}

    // Initial load
    ; (async () => {
        await reloadUsers()
        await reloadProjects()
        await reloadTasks()
    })()
